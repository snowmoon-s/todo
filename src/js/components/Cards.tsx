import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Task } from '../ models/Task'
import { Button, Card, CardContent, TextField } from '@material-ui/core'
import { Edit, Done, DeleteForever } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    background: theme.palette.primary.light,
  },
  cardTitle: {
    padding: theme.spacing(1),
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: 0,
    },
  },
}))

interface Props {
  task: Task
  updateTaskName: (name: string, id: number) => void
  removeTask: (id: number) => void
}

export const Cards = ({ task, updateTaskName, removeTask }: Props) => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)
  const [inputTask, setInputTask] = useState(task.name)

  const handleDone = () => {
    setIsEditing(false)
    updateTaskName(inputTask, task.id)
    setInputTask(task.name)
  }

  return (
    <Card className={classes.card} raised>
      {isEditing ? (
        <div className={classes.cardContainer}>
          <TextField
            onChange={e => setInputTask(e.target.value)}
            value={inputTask}
            label="edit table name"
            margin="normal"
          />
          <Button onClick={handleDone}>{<Done />}</Button>
        </div>
      ) : (
        <div className={classes.cardContainer}>
          <CardContent className={classes.cardTitle}>{task.name}</CardContent>
          <Button onClick={() => setIsEditing(true)}>{<Edit />}</Button>
          <Button onClick={() => removeTask(task.id)}>{<DeleteForever />}</Button>
        </div>
      )}
    </Card>
  )
}
