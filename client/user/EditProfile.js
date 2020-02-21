import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

import { 
  Card,
  CardContent, 
  TextField,
  Icon,
  CardActions,
  Button,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { read, update } from "./api-user"
import auth from "../auth/auth-helper"

const useStyles = makeStyles( theme => ({
  card: {

  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  textField: {

  },
  error: {

  },
  submit: {

  }
}))

const EditProfile = (props) => {

  const [redirectToProfile, setRedirectToProfile] = useState(false)
  const [name, setName] = useState("")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const classes = useStyles()

  const init = userId => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, 
    {t: jwt.token})
      .then( data => {

        if (data.error) {
          setError(data.error)
        } else {
          setName(data.name)
          setEmail(data.email)
        }
      }
    )
  }

  useEffect(() => {
    init(props.match.params.userId)
  }, [])

  const handleSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined
    }
    update({
      userId: props.match.params.userId
    }, {
      t: jwt.token
    }, user).then( data => {

      if (data.error) {
        setError(data.error)
      } else {
        setUserId(data._id)
        setRedirectToProfile(true)
      }
    })
  }

  const handleChange = field => event => {
    switch(field) {
      case "name":
        setName(event.target.value)
        break
      case "email":
        setEmail(event.target.value)
        break
      case "password":
        setPassword(event.target.value)
        break
      default:
        break
    }
  }

  if (redirectToProfile) {
    return (<Redirect to={"/user/" + userId}/>)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography 
          type="headline" 
          component="h2" 
          className={classes.title}
        >
          Edit Profile
        </Typography>

        <TextField 
          id="name" 
          label="Name" 
          className={classes.textField} 
          value={name} 
          onChange={handleChange("name")} 
          margin="normal"
        />
        <br/>

        <TextField 
          id="email" 
          type="email" 
          label="Email" 
          className={classes.textField} 
          value={email} 
          onChange={handleChange("email")} 
          margin="normal"
        />
        <br/>

        <TextField 
          id="password" 
          type="password" 
          label="Password" 
          className={classes.textField} 
          value={password} 
          onChange={handleChange("password")} 
          margin="normal"
        />
        <br/> 
        
        {
          error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {error}
            </Typography>
          )
        }
      </CardContent>

      <CardActions>
        <Button 
          color="primary" 
          variant="contained" 
          onClick={handleSubmit} 
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}
  
export default EditProfile