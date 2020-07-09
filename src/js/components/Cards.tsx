import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Task } from '../ models/Task'
import { Button, Card, CardContent, TextField } from '@material-ui/core'
import { Edit, Done } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  cardTitle: {
    padding: theme.spacing(1),
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

interface Props {
  task: Task
}

export const Cards = ({ task }: Props) => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)
  const [inputTask, setInputTask] = useState(task.name)

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
          <Button onClick={() => setIsEditing(false)}>{<Done />}</Button>
        </div>
      ) : (
        <div className={classes.cardContainer}>
          <CardContent className={classes.cardTitle}>{task.name}</CardContent>
          <Button onClick={() => setIsEditing(true)}>{<Edit />}</Button>
        </div>
      )}
    </Card>
  )
}
