import React, { useState } from "react"
import { Link } from "react-router-dom"

import { 
  Card,
  CardContent, 
  TextField,
  Icon,
  CardActions,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { create } from "./api-user"

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

  }
}))

const SignUp = () => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const classes = useStyles()

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

  const handleSubmit = () => {
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined
    }
    create(user).then( data => {

      if (data.error) {
        setError(data.error)
      } else {
        setError("")
        setOpen(true)
      }
    })
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography 
            type="headline" 
            component="h2"
            className={classes.title}
          >
            Sign Up
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

          {error && (
            <Typography component="p" color="error">
              <Icon 
                color="error"
                className={classes.error}
              >
                error
              </Icon>
              {error}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button 
            color="primary" 
            raised="raised"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

    <Dialog open={open} disableBackdropClick={true}>
      <DialogTitle>New Account</DialogTitle>

      <DialogContent>
        <DialogContentText>
          New account successfully created.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Link to="/signin">
          <Button 
            color="primary" 
            autoFocus="autoFocus" 
            variant="contained"
          >
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  </div>
  )
}
  

export default SignUp