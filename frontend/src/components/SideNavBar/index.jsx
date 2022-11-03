import './SideNavBar.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function SideNavBar(){
    const sessionUser = useSelector((state) => state.session.currentUser);

    return(
   <nav className='user-page-sidenav'> 
        <NavLink className='sidenav-a' id="DM's" to={`/users/${sessionUser.id}`}>
            <i className="fa-solid fa-skull-crossbones"></i>
        </NavLink>
        <a className='sidenav-a' id='add'>
            <svg
                className='plus-button'
                aria-hidden='true'
                role='img'
                width='24'
                height='24'
                viewBox='0 0 24 24'>
                <path
                    fill='currentColor'
                    d='M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z'></path>
            </svg>
        </a>
        <a className='sidenav-a' id='explore'>
            <svg
                aria-hidden='true'
                role='img'
                className='exploratories'
                width='24'
                height='24'
                viewBox='0 0 24 24'>
                <path
                    fill='currentColor'
                    d='M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z'></path>
            </svg>
        </a>
    </nav> 
)
}
