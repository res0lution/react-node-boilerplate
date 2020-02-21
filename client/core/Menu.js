import React from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import { 
  AppBar,
  Toolbar, 
  IconButton,
  Button,
  Typography
} from "@material-ui/core"
import { Home } from "@material-ui/icons"

import auth from "../auth/auth-helper"

const useStyles = makeStyles( theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
}))

const Menu = () => {

  const classes = useStyles()
  let history = useHistory()

  const isActive = (history, path) => {

    if (history.location.pathname == path)
      return {color: "#ff4081"}
    else
      return {color: "#ffffff"}
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            React-node boilerplate
          </Typography>

          <Link to="/">
            <IconButton 
              aria-label="Home" 
              style={isActive(history, "/")}
            >
              <Home/>
            </IconButton>
          </Link>

          <Link to="/users">
            <Button 
              style={isActive(history, "/users")}
            >
              Users
            </Button>
          </Link>

          {!auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button 
                style={isActive(history, "/signup")}
              >
                Sign Up
              </Button>
            </Link>

            <Link to="/signin">
              <Button 
                style={isActive(history, "/signin")}
              >
                Sign In
              </Button>
            </Link>
          </span>)}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu