import classNames from 'classnames/bind'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

import style from './RowContainer.module.scss'
import { useStateValue } from '~/context/StateProvider';
import { actionType } from '~/context/reducer';
import NotFound from '~/assets/img/NotFound.svg'
import axios from 'axios';
import productApi from '~/api/productAPI';
import CreateContainer from '../CreateContainer';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function RowContainer({ flag, data, scrollValue }) {
    const [{ cartItems, modifyItemsShow }, dispatch] = useStateValue();
    const [items, setItems] = useState([]);

    const rowContainer = useRef();
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    const addtoCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        })
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    const showModifyItem = () => {
        dispatch({
            type: actionType.SET_MODIFY_ITEMS_SHOW,
            modifyItemsShow: !modifyItemsShow,
        })
        console.log(modifyItemsShow);
    }

    const modifyProduct = (data) => {
        <CreateContainer data={data} />
    }

    useEffect(() => { addtoCart(); }, [items]);

    const deleteProduct = (id, index) => {
        console.log(id, index);
        const deletePr = async () => {
            try {
                await productApi.deleteProduct(id);
                dispatch({
                    type: actionType.DELETE_ITEMS,
                    payload: index
                })
            }
            catch (error) {
                console.log('Fail to fetch product: ', error);
            }
        }
        deletePr();

    }

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
                                {/* <motion.div
                                    className={cx('item-icon-custom')}
                                    onClick={showModifyItem}
                                >
                                    {modifyItemsShow ? (
                                        <div>
                                            <p onClick={modifyProduct(item)}>Modify</p>
                                            <p onClick={() => deleteProduct(item.id, index)}>
                                                Delete</p>
                                        </div>) : (
                                        <FontAwesomeIcon icon={faScrewdriverWrench} />
                                    )}
                                </motion.div> */}

                                <motion.div
                                    className={cx('add-to-cart')}
                                    whileTap={{ scale: 0.5 }}
                                    onClick={() => setItems([...cartItems, item])}>
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




            {/* {data && data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item?.id}
                        className={cx('item-content')}
                    >
                        <div

                            className={cx('item-image')}>
                            <motion.div
                                whileHover={{ scale: 1.5 }}>
                                <img
                                    src={item?.imageURL}
                                    alt='describe-item'
                                />
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.5 }}
                                className={cx('add-item')}
                            >
                                <ShoppingCartOutlined />
                            </motion.div>
                        </div>
                    </div>
                ))
            ) : (
                <div></div>
            )} */}
        </div>
    )
}

export default RowContainer;