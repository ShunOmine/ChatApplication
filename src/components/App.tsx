import React, { FC, useEffect } from 'react'
import _ from 'lodash'
// firebase
import 'firebase/auth'
// lib
import moment from 'moment'
import 'moment/locale/ja'
import { useApp } from '../hooks/useApp'
import { reduxForm } from 'redux-form'
// stylesheets
import '../stylesheets/App.css'

const App: FC = (props: any): any => {
  // hooks
  const { messages, getApp, onSubmit, name, Name, setName, setContent, postMessage } = useApp()
  // effect
  useEffect(() => {
    getApp()
  }, [getApp])

  const renderForm = () => {
    const { handleSubmit } = props
    return name ?
      <form onSubmit={handleSubmit(postMessage)}>
        <input type="text" name="name" className="readonly_input" value={Name} readOnly/>
        <input type="text" name="content" id="content" onChange={(e) => setContent(e.target.value)} placeholder="メッセージを入力して下さい" />
        <button type="submit">送信</button>
      </form>
      :
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="name" type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="お名前を入力して下さい" />
        <button type="submit">ログイン</button>
      </form>
  }

  const renderTime = (time: any) => {
    moment.locale("ja")
    return moment(time).fromNow()
  }

  return (
    <div className="App">
      { renderForm() }
      {_.map(messages, (message, index) => (
        <div key={index} className="messages_area">
          <p className="name">{message.name}</p>
          <p className="content">{message.content}</p>
          <p className="time">{renderTime(message.created_at.toDate())}</p>
        </div>
      ))}
    </div>
  )
}

export default reduxForm({ form: "userLoginForm" })(App)
