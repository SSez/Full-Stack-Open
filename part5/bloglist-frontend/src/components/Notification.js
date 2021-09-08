import React from 'react'

const Notification = ({ note }) => {
  if (note === null) {
    return null
  }
  return (
    <div className={note.type}>
      {note.message}
    </div>
  )
}

export default Notification