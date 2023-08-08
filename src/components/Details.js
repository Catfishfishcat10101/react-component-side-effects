import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
 const { friendId, close } = props
 const [details, setDetails] = useState(null)
 const [currentFriendId, setCurrentFriendId] = useState(friendId)

 // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.
 useEffect(() => {
   axios
     .get(`${BASE_URL}/friends/${currentFriendId}?api_key=${API_KEY}`)
     .then((response) => setDetails(response.data))
     .catch((error) => console.error('Error fetching details:', error));
 }, [currentFriendId]);

 // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
 // and puts a 'click' event handler on document.
 // See what happens if we don't clean up.
 useEffect(() => {
   document.addEventListener('click', () => {
     axios
       .get(`${BASE_URL}/friends/${currentFriendId}?api_key=${API_KEY}`)
       .then((response) => setDetails(response.data))
       .catch((error) => console.error('Error fetching details:', error));
   });

   return () => {
     document.removeEventListener('click', () => {
       // Do nothing, as we don't want to clean up the event listener on unmount
     });
   };
 }, [currentFriendId]);

 // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.
 useEffect(() => {
   axios
     .get(`${BASE_URL}/friends/${currentFriendId}?api_key=${API_KEY}`)
     .then((response) => setDetails(response.data))
     .catch((error) => console.error('Error fetching details:', error));
 }, [currentFriendId]);

 // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
 // Whenever props.friendId updates we should trigger a fetch for details of the friend.
 useEffect(() => {
   setCurrentFriendId(props.friendId);
 }, [props.friendId]);

 return (
   <div className='container'>
     <h2>Details (of friend with id {currentFriendId}):</h2>
     {details &&
       <>
         <p>{details.name} is {details.age}</p>
         <p>email is {details.email}</p>
         {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
       </>
     }
     <button onClick={close}>Close</button>
   </div>
 )
}