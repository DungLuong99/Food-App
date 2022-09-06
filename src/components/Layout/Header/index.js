import classNames from 'classnames/bind'
import {
    ShoppingCartOutlined, AppstoreAddOutlined, LogoutOutlined,
    HomeOutlined, BookOutlined, InfoCircleOutlined, CustomerServiceOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

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
                        <li>Home</li>
                        <li>Menu</li>
                        <li>About Us</li>
                        <li>Service</li>
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
                            src={user ? user.photoURL : Avatar}
                            onClick={login}
                            alt='userprofile'
                        />
                        <div>

                            {menu && (
                                <motion.div className={cx('user-after-login')}>
                                    {user && user.email === 'dunglt2301@gmail.com' && (
                                        <Link to={'/create'}>
                                            <p>New Item <AppstoreAddOutlined /></p>
                                        </Link>
                                    )}
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
                    <ShoppingCartOutlined />
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
                                {user && user.email === 'dunglt2301@gmail.com' && (
                                    <Link to={'/create'}>
                                        <p>New Item <AppstoreAddOutlined /></p>
                                    </Link>
                                )}

                                <ul className={cx('mobile-nav-list')}>
                                    <li>Home <HomeOutlined /></li>
                                    <li>Menu <BookOutlined /></li>
                                    <li>About Us <InfoCircleOutlined /></li>
                                    <li>Service <CustomerServiceOutlined /></li>
                                </ul>

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