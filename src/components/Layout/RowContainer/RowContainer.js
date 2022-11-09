import classNames from 'classnames/bind'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef, memo } from 'react'
import { motion } from 'framer-motion'

import style from './RowContainer.module.scss'
import { useStateValue } from '~/context/StateProvider';
import { actionType } from '~/context/reducer';
import NotFound from '~/assets/img/NotFound.svg'
import productApi from '~/api/productAPI';

const cx = classNames.bind(style);

function RowContainer({ flag, data, scrollValue }) {
    const [{ cartItems }, dispatch] = useStateValue();
    const [items, setItems] = useState([]);

    console.log("cartItems", cartItems);

    const rowContainer = useRef();
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    const addtoCart = (item) => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            payload: item,
        })
        // localStorage.setItem("cartItems", JSON.stringify(items));
        // localStorage.setItem("cartItems", JSON.stringify(cartItems));

    };


    // useEffect(() => { addtoCart(); }, [items]);

    return (
        <div
            ref={rowContainer}
            className={cx(flag ? 'item-row' : 'item-colum')}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <div
                        key={item?.id}
                        className={cx('item-inner')}
                    >
                        <div
                            className={cx('item-image')}
                        >
                            <motion.img
                                src={item?.image?.imageURL}
                                alt=''
                                whileHover={{ scale: 1.2 }}
                            />
                            <div className={cx('item-icon')}>
                                <motion.div
                                    className={cx('add-to-cart')}
                                    whileTap={{ scale: 0.5 }}
                                    onClick={() => addtoCart(item)}
                                // onClick={() => setItems([...cartItems, item])}
                                >
                                    <ShoppingCartOutlined />
                                </motion.div>
                            </div>
                        </div>

                        <div className={cx('item-content')}>
                            <p className={cx('item-name')}>{item.name}</p>
                            <p className={cx('item-calories')}>{item.calories} Calories</p>
                            <div className={cx('item-price')}>
                                <p>
                                    <span>$</span>
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={cx('items-notfound')}>
                    <img
                        src={NotFound}
                        alt="" />
                    <p>Items not Available</p>

                </div>)}
        </div>
    )
}

export default RowContainer;