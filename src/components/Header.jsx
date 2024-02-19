import { Link } from 'react-router-dom'
import logo from '/Logo.svg'


function Header() {
    return (
        <div className="img flex justify-center items-center h-full mt-32 mb-28">
            <Link to={'/'}><img src={logo}  alt="logo" className='max-w-full align-middle' /></Link>
        </div>
    )
}

export default Header