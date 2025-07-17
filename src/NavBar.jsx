import Logo from './assets/images/Logo.png'
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from 'react';
import { FaRegUser } from "react-icons/fa";

export default function NavBar(user)
{
    const [sub, setSub] = useState(false);
    return(
        <>
            <nav className='d-flex justify-content-between align-items-center flex-wrap position-fixed'>
                <img src={Logo} alt="" />
                <HiMenuAlt3 onClick={()=>setSub(!sub)}/>
                <div className={`subnv d-flex justify-content-center align-items-center ${sub? "subActive" : " "}`}>
                    <Link to='/'>
                        HOME
                    </Link>
                    <Link to='/about'>
                        ABOUT
                    </Link>
                    <Link to='/hotels'>
                        HOTELS
                    </Link>
                    {user.loginedUser? <Link className="user d-flex justify-content-center align-items-center gap-2" to='/userpanel'><FaRegUser/>Profile</Link> : <Link className="user" to='/login'>Login</Link>}
                </div>
            </nav>
        </>
    )
}