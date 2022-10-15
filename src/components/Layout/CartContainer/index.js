import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLeftLong,
    faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';

import style from './CartContainer.module.scss'
import { useStateValue } from '~/context/StateProvider';
import { actionType } from '~/context/reducer';
import EmptyCart from '~/assets/img/emptyCart.svg'
import CartItems from '../CartItems';

const cx = classNames.bind(style)

function CartContainer() {
    const [{ cartShow, cartItems }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [total, setTotal] = useState(0);

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.price;
        }, 0);
        setTotal(totalPrice);
    }, [cartItems, flag]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
    }

    return (
        <motion.div className={cx('wrapper')}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
        >
            <div className={cx('title')}>
                <div className={cx('icon-back')}
                    onClick={showCart}>
                    <FontAwesomeIcon icon={faLeftLong} />
                </div>
                <p className={cx('title-name')}>Cart</p>
                <motion.p className={cx('title-clear')}
                    whileTap={{ scale: 0.5 }}
                    onClick={clearCart}
                >
                    Clear <FontAwesomeIcon icon={faArrowsRotate} />
                </motion.p>
            </div>

            {cartItems && cartItems.length > 0 ? (
                <div className={cx('inner')}>
                    <div className={cx('content')}>
                        {cartItems.map(item => (
                            <CartItems key={item.id}
                                item={item}
                                flag={flag}
                                setFlag={setFlag} />
                        ))}

                    </div>

                    <div className={cx('payment')}>
                        <div className={cx('subtotal')}>
                            <p >Subtotal</p>
                            <p >${total}</p>
                        </div>
                        <div className={cx('delivery')}>
                            <p >Delivery</p>
                            <p >$2.5</p>
                        </div>
                        <div className={cx('total')}>
                            <p >Total</p>
                            <p >${total + 2.5}</p>
                        </div>
                        <button className={cx('button-checkout')}>
                            Login to check out</button>
                    </div>
                </div>) :
                (
                    <div className={cx('empty-cart')}>
                        <img
                            src={EmptyCart}
                            alt=""
                        />
                        <p>Add some items to your cart</p>
                    </div>
                )}



        </motion.div >);
}

export default CartContainer;