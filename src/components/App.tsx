import React, { FC, useEffect } from 'react'
import _ from 'lodash'
// ui
import Header from './Header'
import Message from './Message'
// firebase
import 'firebase/auth'
// hooks
import { useApp } from '../hooks/useApp'
// lib
import { reduxForm } from 'redux-form'
// stylesheets
import '../stylesheets/App.css'

const App: FC = (props: any): any => {
  // hooks
  const {
    messages,
    getApp,
    onSubmit,
    name,
    Name,
    setName,
    setContent,
    postMessage,
  } = useApp()

  // effect
  useEffect(() => {
    getApp()
  }, [getApp])

  // render form
  const renderForm = () => {
    const { handleSubmit } = props
    return name ?
      <form onSubmit={handleSubmit(postMessage)} className="form">
        <span className="show_name">{Name}</span>
        <input type="text" name="name" className="readonly_input" value={Name} readOnly/>
        <input type="text" name="content" className="content" id="content" onChange={(e) => setContent(e.target.value)} placeholder="メッセージを入力して下さい" />
        <button type="submit" className="submit m">送信</button>
      </form>
      :
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input id="name" className="name" type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="お名前を入力して下さい" />
        <button type="submit" className="submit l">ログイン</button>
      </form>
  }

  // render message
  const renderMessage = () => {
    return (
      <div className="message_area">
        {_.map(messages, (message, index) => (
          <Message
            key={index}
            {...message}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      { renderForm() }
      { renderMessage() }
    </div>
  )
}

export default reduxForm({ form: "Form"})(App)
