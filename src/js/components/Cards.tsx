import { Card, CardContent } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Task } from '../ models/Task'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
    border: '1px solid #333',
    borderRadius: '20px',
  },
  cardTitle: {
    padding: theme.spacing(1),
  },
}))

interface Props {
  task: Task
}

export const Cards = ({ task }: Props) => {
  const classes = useStyles()
  // const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className={classes.card} raised>
      <CardContent className={classes.cardTitle}>{task.name}</CardContent>
    </Card>
  )
}
