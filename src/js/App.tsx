import React, { useState } from 'react'
import { makeStyles, AppBar, Toolbar, Typography, IconButton, Button, TextField } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Task } from './ models/Task'
import { AddCircleOutline } from '@material-ui/icons'
import { Cards } from './components/Cards'

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
    padding: theme.spacing(2),
    width: '60vw',
    margin: '0 auto',
    textAlign: 'center',
  },
  error: {
    color: theme.palette.secondary.main,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

export const App = () => {
  const classes = useStyles()
  const [newName, setNewName] = useState('')
  const [task, setTask] = useState<Task[]>([])
  const [err, setErr] = useState('')

  const handleClear = () => {
    // alert('you want to delete everything, right?')
    setTask([])
  }

  const handleCheckName = () => {
    console.log('newName', newName)
    if (!newName) {
      setErr('PLZ input task name')
      return
    }
    const name = newName.trim()
    if (task.filter(list => list.name == name).length > 0) {
      setErr('PLZ another name')
      return
    }
    const newTask = { id: task.length, name: name }
    setTask(task.concat(newTask))
    setNewName('')
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
          <Button color="inherit" onClick={() => handleClear()}>
            All Clear
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.container}>
          <TextField
            InputLabelProps={{ shrink: true }}
            onChange={e => setNewName(e.target.value)}
            label="input your task"
            value={newName}
          />
          <Button variant="contained" onClick={() => handleCheckName()}>
            <AddCircleOutline />
          </Button>
        </div>
        <p className={classes.error}>{err ? err : ''}</p>
        <div>
          {task ? (
            task.map((list, i) => {
              return <Cards task={list} key={i} />
            })
          ) : (
            <p>タスクを入力してください</p>
          )}
        </div>
      </main>
    </>
  )
}
