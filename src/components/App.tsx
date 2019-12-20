import React, { FC, useEffect } from 'react'
import _ from 'lodash'
// ui
import Header from './Header'
import Message from './Message'
import { CircularProgress } from '@material-ui/core'
// firebase
import 'firebase/auth'
// hooks
import { useApp } from '../hooks/useApp'
// lib
import { reduxForm } from 'redux-form'
import { useDispatch } from 'react-redux'
// stylesheets
import '../stylesheets/App.css'
import {addName} from "../actions/User";

const App: FC = (props: any): any => {
  // hooks
  const {
    messages,
    getApp,
    name,
    Name,
    setName,
    setContent,
    postMessage,
    loading,
  } = useApp()

  // effect
  useEffect(() => {
    getApp()
  }, [getApp])

  const dispatch = useDispatch()

  // render form
  const renderForm = () => {
    const { handleSubmit, pristine, submitting, invalid } = props
    return name ?
      <form onSubmit={handleSubmit(postMessage)} className="form">
        <span className="show_name">{Name}</span>
        <input type="text" name="name" className="readonly_input" value={Name} readOnly/>
        <input type="text" name="content" className="content" id="content" onChange={(e) => setContent(e.target.value)} placeholder="メッセージを入力して下さい" />
        <button type="submit" className="submit m" disabled={pristine || submitting || invalid}>送信</button>
      </form>
      :
      <form onSubmit={handleSubmit(dispatch(addName(Name)))} className="form">
        <input id="name" className="name" type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="お名前を入力して下さい" />
        <button type="submit" className="submit l" disabled={pristine || submitting || invalid}>ログイン</button>
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
      { loading ?
        <CircularProgress className="progress" />
        :
        renderMessage()
      }
    </div>
  )
}

export default reduxForm({ form: "Form"})(App)
