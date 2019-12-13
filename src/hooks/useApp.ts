import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// actions
import { addName } from '../actions/User'
import { getMessages } from '../actions/Messages'
// models
import { MainProps } from '../models'

interface State extends MainProps{}

export const useApp = () => {
  // state
  const [name, setName] = useState('')
  // dispatch
  const dispatch = useDispatch()
  // select
  const [ messages ] = useSelector(
    (state: State) => [
      state.messages
    ]
  )

  const getApp = useCallback(async () => {
    try {
      dispatch(getMessages())
    } catch (e) {
      console.log(e)
    }
  }, [dispatch])

  const onSubmit = () => {
    dispatch(addName(name))
    document.cookie = `name=${name}; path=/;`
  }

  const Name = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*=\s*([^;]*).*$)|^.*$/, "$1")

  return { messages, getApp, onSubmit, setName, Name }
}
