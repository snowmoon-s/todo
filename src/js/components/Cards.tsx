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
  groupId: number
  updateTaskName: (name: string, id: number, groupId: number) => void
  removeTask: (id: number, groupId: number) => void
}

export const Cards = ({ task, groupId, updateTaskName, removeTask }: Props) => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)
  const [inputTask, setInputTask] = useState(task.name)

  const handleDone = () => {
    setIsEditing(false)
    updateTaskName(inputTask, task.id, groupId)
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
          <Button onClick={() => removeTask(task.id, groupId)}>{<DeleteForever />}</Button>
        </div>
      )}
    </Card>
  )
}
