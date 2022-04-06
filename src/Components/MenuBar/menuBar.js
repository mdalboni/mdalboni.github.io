
import './menuBar.css';
import { logo } from '../../images';

function HomeHeader() {
    return (
        <div className='HomeHeader'>
            <Logo></Logo>
            <Menu></Menu>
        </div>
    );
}

function Logo() {
    return (
        <div className='Logo'>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

function Menu() {
    return (
        <div className='HomeMenu'>
            <div className='HomeMenuSpacer'></div>
            <MenuItem href='#' text='Skills'></MenuItem>
            <MenuItem href='#' text='GitHub'></MenuItem>
            <MenuItem href='#' text='LinkedIn'></MenuItem>
        </div>
    );
}

function MenuItem(props) {
    return (
        <div className='HomeMenuItem'>
            <a href={props.href}>{props.text}</a>
        </div>
    );
}

export default HomeHeader;