import React,{Component} from 'react'
import './header.css'
import logo from '../img/logo.png'

class Header extends Component {
    render() {
        return (
            <div className='component-header row'>
                <img src={logo} width='40' className='-col-auto'/>
                    <h1 className='caption'>React Music Player</h1>
            </div>
                );
    }
}

export default Header;