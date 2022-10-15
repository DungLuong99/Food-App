import classNames from 'classnames/bind'
import Search from '../Search';

import style from './SideBar.module.scss'

const cx = classNames.bind(style);

function SideBar() {
    return (<Search />
    );
}

export default SideBar;