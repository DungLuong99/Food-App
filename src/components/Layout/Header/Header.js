import classNames from 'classnames/bind'
import {
    ShoppingCartOutlined, AppstoreAddOutlined, LogoutOutlined,
    HomeOutlined, BookOutlined, InfoCircleOutlined, CustomerServiceOutlined,
    EditOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import style from './Header.module.scss'
import Logo from '~/assets/img/logo.png'
import Avatar from '~/assets/img/avatar.png'
import { app } from '~/firebase.config'
import { useStateValue } from '~/context/StateProvider';
import { actionType } from '~/context/reducer';

const cx = classNames.bind(style)


function Header() {

    const firebaseAuth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [menu, setMenu] = useState(false)

    const login = async () => {

        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setMenu(!menu);
        }

    }

    const logout = () => {
        setMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        })
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>

                <Link to={'/'} className={cx('logo')}>
                    <img src={Logo} alt='logo' />
                    <p>City</p>
                </Link>

                <div className={cx('content')}>

                    <motion.ul className={cx('nav-list')}>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/menu'}>Menu</Link>
                        <Link to={'/about_us'}>About Us</Link>
                        <Link to={'/service'}>Service</Link>
                    </motion.ul>

                    <div className={cx('cart')}
                        onClick={showCart}
                    >
                        <ShoppingCartOutlined />
                        {cartItems && cartItems.length > 0 && (
                            <div className={cx('cart-content')}>
                                <p>{cartItems.length}</p>
                            </div>
                        )}
                    </div>

                    <div className={cx('user')}>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL
                                : Avatar}
                            onClick={() => login()}
                            alt='userprofile'
                        />
                        <div>

                            {menu && (
                                <motion.div className={cx('user-after-login')}>

                                    <Link to={'/create'}>
                                        <p>New Item <AppstoreAddOutlined /></p>
                                    </Link>
                                    <Link to={'/modify'}>
                                        <p >Modify <EditOutlined /></p>
                                    </Link>
                                    <p onClick={logout}
                                    >
                                        Logout <LogoutOutlined />
                                    </p>
                                </motion.div>
                            )}
                        </div>

                    </div>
                </div>


            </div>

            {/* mobile */}
            <div className={cx('mobile')}>

                <div className={cx('mobile-cart')}
                    onClick={showCart}
                >
                    <ShoppingCartOutlined className={cx('icon-cart')} />
                    {cartItems && cartItems.length > 0 && (
                        <div className={cx('mobile-cart-content')}>
                            <p>{cartItems.length}</p>
                        </div>
                    )}
                </div>

                <Link to={'/'} className={cx('logo')}>
                    <img src={Logo} alt='logo' />
                    <p>City</p>
                </Link>


                <div className={cx('user')}>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        onClick={login}
                        alt='userprofile'
                    />

                    <div className={cx('list-option')}>
                        {menu && (

                            <motion.div className={cx('user-after-login')}>
                                <Link to={'/create'}>
                                    <p>New Item <AppstoreAddOutlined /></p>
                                </Link>
                                <Link to={'/modify'}>
                                    <p className={cx('modify')}>Modify <EditOutlined /></p>
                                </Link>

                                <motion.ul className={cx('mobile-nav-list')}>
                                    <Link to={'/'}>Home <HomeOutlined /> </Link>
                                    <Link to={'/menu'}>Menu <BookOutlined /> </Link>
                                    <Link to={'/about_us'}>About Us <InfoCircleOutlined /></Link>
                                    <Link to={'/service'}>Service <CustomerServiceOutlined /> </Link>
                                </motion.ul>

                                <p className={cx('mobile-logout')}
                                    onClick={logout}
                                >
                                    Logout <LogoutOutlined /></p>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>


        </div>
    );
}

export default Header;