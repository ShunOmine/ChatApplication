import React, { Component } from 'react'
import _ from 'lodash'
// firebase
import 'firebase/auth'
// stylesheets
import '../stylesheets/App.css'
import { addName } from '../actions/User'
import { getMessages } from '../actions/Messages'
import { connect } from "react-redux"
import moment from 'moment'
import 'moment/locale/ja'

export const Name = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*=\s*([^;]*).*$)|^.*$/, "$1")

interface Props {
  addName: Function,
  getMessages: Function,
  name: string,
  messages: {
    name: string,
    content: string,
    created_at: any,
  }[],
}

class App extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  state = {
    name: ''
  }

  componentDidMount(): void {
    this.props.getMessages()
  }

  onSubmit = () => {
    this.props.addName(this.state.name)
    document.cookie = `name=${this.state.name}; path=/;`
  }

  renderForm = () => {
    return Name ?
      <p>{Name}</p>
      :
      <form onSubmit={() => this.onSubmit()}>
        <input id="name" type="text" name="name" onChange={(e) => this.setState({ name: e.target.value })} placeholder="お名前を入力して下さい" />
        <input type="submit" value="ログイン" />
      </form>
  }

  renderTime = (time: any) => {
    moment.locale("ja")
    return moment(time).fromNow()
  }

  render() {
    const { messages } = this.props
    return (
      <div className="App">
        { this.renderForm() }
        {_.map(messages, (message, index) => (
          <div key={index} className="messages_area">
            <p className="name">{message.name}</p>
            <p className="content">{message.content}</p>
            <p className="time">{this.renderTime(message.created_at.toDate())}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  name: state.name,
  messages: state.messages
})
const mapDispatchToProps = ({ addName, getMessages })

export default connect(mapStateToProps, mapDispatchToProps)(App)
