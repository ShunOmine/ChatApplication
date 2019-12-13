import React, { FC, useEffect } from 'react'
import _ from 'lodash'
// firebase
import 'firebase/auth'
// lib
import moment from 'moment'
import 'moment/locale/ja'
import { useApp } from '../hooks/useApp'
// stylesheets
import '../stylesheets/App.css'

const App: FC = (): any => {
  // hooks
  const { messages, getApp, onSubmit, setName, Name } = useApp()

  // effect
  useEffect(() => {
    getApp()
  }, [getApp])

  const renderForm = () => {
    return Name ?
      <form>
        <input type="text" name="name" className="readonly_input" value={Name} readOnly/>
        <input type="text" name="content" placeholder="メッセージを入力して下さい" />
        <input type="submit" value="送信" />
      </form>
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
