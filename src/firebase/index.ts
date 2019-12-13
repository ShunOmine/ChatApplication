import * as firebase from 'firebase/app'
import { firebaseConfig } from '../config/firebase'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)

export default firebase
