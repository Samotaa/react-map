import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import './style.sass'
import { NavbarData } from './NavbarData'
export default function Navbar() {

    const [navbar, setNavbar] = useState(false)

    const showMenu = () => setNavbar(!navbar)

    return (
        <>
            <div className='container'>
                <div className='navbar__icon'>
                    <MenuUnfoldOutlined style={{ fontSize: '18px', color: '#000' }} onClick={showMenu} />
                </div>
                <div className={navbar ? 'navbar__menu active' : 'navbar__menu'}>
                    <ul className='navbar__list'>
                        {NavbarData.map((item, index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <Link to={item.path}>
                                        <div>{item.title}</div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <MenuFoldOutlined className="close__button" style={{ fontSize: '38px', color: '#fff' }} onClick={showMenu}/>
                </div>
            </div>


        </>
    )
}

