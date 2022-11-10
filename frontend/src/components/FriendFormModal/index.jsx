import { useEffect } from 'react';
import { useState } from 'react'
import { indexUser } from '../../store/users';
import './newFriendForm.css'

export default function NewFriendForm({setFriendModal}){
    const [username, setUsername] = useState();
    const [users, setUsers] = useState();
    const [filteredUsers, filterUsers] = useState(users);
    
    useEffect(() => {  
        async function userSetter(){
            let grabbedUsers = await indexUser()
            setUsers(grabbedUsers)  
        }
        userSetter()
    },[])
  

    const handleInput = (e) => {
        const filterer = e.currentTarget.value
        const reg_exp = new RegExp(`*${filterer}*`, 'i')
        filterUsers(users.filter((user) => {
           (reg_exp).test(user.username)
        }))
        setUsername(filterer)
    }

    return (
    <div className="friend-form-modal">
        <button
				className='closeIcon-container'
				onClick={() => setFriendModal(false)}>
				<svg
					className='closeIcon'
					aria-hidden='true'
					role='img'
					width='24'
					height='24'
					viewBox='0 0 24 24'>
					<path
						fill='currentColor'
						d='M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z'></path>
				</svg> 
        </button>
        <div className='friend-form-header'>
            <h1>Add a new friend!</h1>
            <p>
                Hanging out and being social helps brighten your life!
            </p>
        </div>
        <div className='known-users'>
            <h1>People you may know...</h1>
            {filteredUsers?.map((user) => {
                <div>
                    <h1>{user.username}</h1>
                </div>
            }).slice(0,3)}
        </div>
        <form className='friend-form'>
            <input type="text" placeholder='Friend username' value={username} onChange={handleInput}/>
        </form>
    </div>
)}