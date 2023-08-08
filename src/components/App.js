import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'
import Details from './Details'

export default function App() {
 const [friends, setFriends] = useState([])
 const [currentFriendId, setCurrentFriendId] = useState(null)

 const openDetails = id => {
   setCurrentFriendId(id)
 }

 const closeDetails = () => {
   setCurrentFriendId(null)
 }

 // 👉 TASK 3 - make an effect that runs after FIRST DOM surgery
 // caused by the first render only. You'll need `useEffect` from React.
 // The effect should consist of a call to the API using axios.
 // On success, set the array of friend objects from the API into state.
 useEffect(() => {
   axios.get(`${BASE_URL}friends?api_key=${API_KEY}`)
     .then(res => setFriends(res.data.results))
 }, [])

 const Friend = props => (
   <div classname='friend' onClick={() => openDetails(props.info.id)}>
     {props.info.name}
     <button>Details</button>
   </div>
 )

 return (
   <div className='container'>
     <h1>Some of my friends:</h1>
     {friends.map(friend => <Friend key={friend.id} info={friend} />)}
     {currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />}
   </div>
 )
}