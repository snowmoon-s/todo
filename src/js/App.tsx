import React, { useState } from 'react'
import { makeStyles, AppBar, Toolbar, Typography, IconButton, Button, TextField } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    margin: 0,
  },
  main: {
    margin: '0 auto',
    padding: theme.spacing(1),
    display: 'flex',
  },
  error: {
    color: theme.palette.secondary.main,
  },
}))

export const App = () => {
  const classes = useStyles()
  const [newName, s21etNewName] = useState('')
  const [lists, setLists] = useState([])
  const [err, setErr] = useState('')

  const handleClear = () => {
    // alert('you want to delete everything, right?')
  }

  const handleCheckName = () => {
    setErr('')
    if (!newName) {
      setErr('PLZ input task name')
      return
    }
    const name = newName.trim()
    if (lists.filter(list => list.name == name > 0)) {
      setErr('PLZ another name')
      return
    }
  }

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TodoList
          </Typography>
          <Button color="inherit">All Clear</Button>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <TextField onChange={e => setNewName(e.target.value)} />
        <Button variant="contained" onClick={handleCheckName()}>
          OK
        </Button>
        <p className={classes.erroor}>{err ? err : ''}</p>
      </main>
    </>
  )
}
