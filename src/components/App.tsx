import React, { FC, useEffect } from 'react'
import _ from 'lodash'
// firebase
import 'firebase/auth'
// models
import { MainProps } from '../models'
// lib
import moment from 'moment'
import 'moment/locale/ja'
// stylesheets
import '../stylesheets/App.css'
import {useApp} from "../hooks/useApp";

export const Name = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*=\s*([^;]*).*$)|^.*$/, "$1")

interface Props extends MainProps {}

const App: FC = (): any => {
  // hooks
  const { messages, getApp, onSubmit, setName } = useApp()

  // effect
  useEffect(() => {
    getApp()
  }, [getApp])

  const renderForm = () => {
    return Name ?
      <p>{Name}</p>
      :
      <form onSubmit={() => onSubmit()}>
        <input id="name" type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="お名前を入力して下さい" />
        <input type="submit" value="ログイン" />
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

export default App
