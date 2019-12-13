import React, { Component } from 'react'
// firebase
// import firebase from './firebase'
import 'firebase/auth'
// stylesheets
import './App.css'
import { addName } from './actions/User'
import { connect } from "react-redux"

interface Props {
  addName: Function,
  name: string
}

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <input type="text" onChange={(e) => this.props.addName(e.target.value)} />
        <p>{this.props.name}</p>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  console: console.log(state),
  name: state.name,
})
const mapDispatchToProps = ({ addName })

export default connect(mapStateToProps, mapDispatchToProps)(App)
