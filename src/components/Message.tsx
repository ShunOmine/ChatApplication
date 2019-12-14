import React from 'react'
// lib
import { useApp } from '../hooks/useApp'

function Message(message: any) {
  const { renderTime } = useApp()

  return (
    <div className="message_box">
      <p className="name">{message.name}</p>
      <p className="content">{message.content}</p>
      <p className="time">{renderTime(message.created_at.toDate())}</p>
    </div>
  )
}

export default Message
