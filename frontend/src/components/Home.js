import React from 'react'
import icon from '../imgs/icon.png'
import '../css/home.css'
import '../css/popup.css'
import { Outlet, Link } from 'react-router-dom'
import Login from './Login'
import { useState, useContext } from 'react'
import Register from './Register'
import { userContext } from '../App'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate();
    const [User, setUser] = useContext(userContext);
    const [popup, setpopup] = useState({
        open: false,
        elem: null
    })

    const [dis, setDis] = useState('none')

    const signout = ()=>{
        document.cookie = 'jwt=';
        setUser({})
        navigate('/')
    }

    return (
        <>
            {popup.open && popup.elem}
            <div onClick={(e) => {
                if (popup.open) { e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); setpopup({ ...popup, open: false }) }
                if (dis === 'block') {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    setDis('none')
                }
            }}>
                <div className='Home'>
                    <nav className='flex space-between v-center'>
                        <div className=''>
                            <Link to="/">
                                <img src={icon} alt="icon" id='icon' />
                            </Link>
                        </div>
                        <ul className='flex nav'>
                            {/* <li className='cursor'>Dashboard</li> */}
                            {User && User.username ?
                                //  <div>Welcome, {User.first_name.toUpperCase()} {User.last_name.toUpperCase()}</div> 
                                <>
                                    <div id='profile-pop'>
                                        <div onClick={() => { (dis === 'none') ? setDis('block') : setDis('none') }}>
                                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                                        </div>
                                        <div id="profile" style={{ display: dis }}>
                                            <p>{User.username}</p>
                                            <div className='cursor' id='logout' onClick={signout}>Logout</div>
                                        </div>
                                    </div>
                                    <Link to="/alltests">Tests</Link>
                                    <Link to="/results">Results</Link>
                                </>
                                :
                                <>
                                    <li className='cursor' onClick={() => { if (!popup.open) { setpopup({ open: true, elem: <Login setpopup={setpopup} /> }) } }}>Login</li>
                                    <li className='cursor' onClick={() => { if (!popup.open) { setpopup({ open: true, elem: <Register setpopup={setpopup} /> }) } }}>Register</li>
                                </>
                            }
                        </ul>
                    </nav>

                    <div id="content" className="">
                        <Outlet />


                    </div>
                </div >
                <footer className='footer flex v-center'>
                    <div id='icons'>
                        <a href="https://www.facebook.com/balajigovindmalali" title="facebook">
                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                        </a>
                        <a href="https://www.instagram.com/balajimalali/" title="instagram">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href="https://github.com/balajimalali" title="github">
                            <i className="fa fa-github" aria-hidden="true"></i>
                        </a>
                        <a href="https://linkedin.com/in/balajimalali" title="linkedin">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="https://twitter.com/balaji_malali" title="twitter">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                    </div>
                </footer>
            </div>
        </>
    )
}
