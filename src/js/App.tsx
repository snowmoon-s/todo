import React, { useState } from 'react'
import { makeStyles, AppBar, Toolbar, Typography, IconButton, Button, TextField } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
// import { Task } from './ models/Task'
import { Group } from './ models/Group'
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
  cardContainer: {
    border: '1px solid #333',
    background: theme.palette.primary.main,
  },
}))

export const App = () => {
  const classes = useStyles()
  const [newName, setNewName] = useState('')
  // const [task, setTask] = useState<Task[]>([])
  const [group, setGroup] = useState<Group[]>([{ id: 0, name: 'no-group', tasks: [] }])
  const [err, setErr] = useState('')

  const handleClear = () => {
    // alert('you want to delete everything, right?')
    // setTask([])
    setGroup([{ id: 0, name: 'no-group', tasks: [] }])
  }

  const handleCheckName = (groupId: number) => {
    if (!newName) {
      setErr('PLZ input task name')
      return
    }
    const name = newName.trim()
    if (group[groupId].tasks.filter(list => list.name == name).length > 0) {
      setErr('PLZ another name')
      return
    }
    const newGroup: Group[] = group.map(list => {
      if (list.id === groupId) {
        return { id: list.id, name: list.name, tasks: list.tasks.concat({ id: list.tasks.length, name: name }) }
      } else {
        return list
      }
    })
    setGroup(newGroup)
    setNewName('')
  }

  const updateTaskName = (name: string, id: number, groupId: number) => {
    if (!name) return
    if (group[groupId].tasks.filter(list => list.name === name).length > 0) return

    const newGroup: Group[] = group.map(list => {
      if (list.id === groupId) {
        const newTask = list.tasks.map(task => {
          if (task.id === id) {
            return { id: id, name: name }
          } else {
            return task
          }
        })
        return { id: list.id, name: list.name, tasks: newTask }
      } else {
        return list
      }
      // list.tasks.map((task, i) => {
      //   if (task.id === id) return { id: id, name: name }
      //   return list
      // })
    })
    setGroup(newGroup)
  }

  const removeTask = (id: number, groupId: number) => {
    if (id < 0) throw new Error('システムエラーが発生しました')
    if (group[groupId].tasks.filter(list => list.id === id).length !== 1)
      throw new Error('システムエラーが発生しました')
    const newTask = group[groupId].tasks.filter(list => list.id !== id)
    const newGroup = group.map(list => {
      if (list.id === groupId) {
        return { id: groupId, name: list.name, tasks: newTask }
      } else {
        return list
      }
    })
    setGroup(newGroup)
  }

  const createGroup = (name: string) => {
    if (!name) return
    if (group.filter(list => list.name === name).length > 0) setErr('グループ名を変更してください')
    setGroup(group.concat({ id: group.length, name: name, tasks: [] }))
  }

  const updateGroup = (id: number, name: string) => {
    if (!name) return
    if (group.filter(list => list.name === name && list.id !== id).length > 0) setErr('グループ名を変更してください')
    const newGroup = group.map(list => {
      if (list.id === id) {
        return { id: id, name: name, tasks: list.tasks }
      } else {
        return list
      }
    })
    setGroup(newGroup)
  }

  const deleteGroup = (id: number) => {
    if (!id) return
    const newGroup = group.filter(list => list.id !== id)
    setGroup(newGroup)
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
          <Button color="secondary" variant="contained" onClick={() => handleCheckName(0)}>
            <AddCircleOutline />
          </Button>
        </div>
        <p className={classes.error}>{err ? err : ''}</p>
        <div>
          {group.map(list => {
            return (
              <div key={list.id} className={classes.cardContainer}>
                <p>{list.name}</p>
                {list.tasks ? (
                  list.tasks.map(task => {
                    return <Cards task={task} key={list.id} updateTaskName={updateTaskName} removeTask={removeTask} />
                  })
                ) : (
                  <p>タスクを入力してください</p>
                )}
              </div>
            )
          })}
          )
        </div>
      </main>
    </>
  )
}
