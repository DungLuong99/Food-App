import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faMinus
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

import style from './CartItems.module.scss'
import { useEffect, useState } from 'react'
import { useStateValue } from '~/context/StateProvider'
import { actionType } from '~/context/reducer'

const cx = classNames.bind(style)
let items = [];

function CartItems({ item, flag, setFlag }) {

    const [quantity, setQuantity] = useState(item.quantity);
    const [{ cartItems, user }, dispatch] = useStateValue();

    console.log(user);
    const cartDispatch = () => {

        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        })
    }

    const updateQuantity = (action, id) => {

        if (action === "add") {
            setQuantity(quantity + 1);
            cartItems.map((item) => {
                if (item.id === id) {
                    item.quantity += 1;
                    setFlag(flag + 1);
                }
            });
            cartDispatch();
        } else {
            // initial state value is one so you need to check if 1 then remove it
            if (quantity === 1) {
                items = cartItems.filter((item) => item.id !== id);
                setFlag(flag + 1);
                cartDispatch();
            } else {
                setQuantity(quantity - 1);
                cartItems.map((item) => {
                    if (item.id === id) {
                        item.quantity -= 1;
                        setFlag(flag + 1);
                    }
                });
                cartDispatch();
            }
        }
    }

    useEffect(() => {
        items = cartItems;
    }, [quantity, items]);

    return (
        <div
            className={cx('items')}
        >
            <img
                src={item?.image?.imageURL}
                alt=""
            />
            <div className={cx('info')}>
                <p className={cx('info-name')}>{item?.name}</p>
                <p className={cx('info-price')}>${(item?.price) * quantity}</p>
            </div>
            <div className={cx('quantity')}>
                <motion.div
                    whileTap={{ scale: 0.25 }}
                    onClick={() => updateQuantity("remove", item?.id)}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </motion.div>
                <p>{item.quantity}</p>

                <motion.div
                    whileTap={{ scale: 0.25 }}
                    onClick={() => updateQuantity("add", item?.id)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </motion.div>
            </div>
        </div>);
}

export default CartItems;