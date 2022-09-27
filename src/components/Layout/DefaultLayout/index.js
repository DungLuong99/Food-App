import classNames from 'classnames/bind'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import style from './DefaultLayout.module.scss'
import Header from "~/components/Layout/Header";
import HomeContainer from '~/components/Layout/HomeContainer'
import { actionType } from "~/context/reducer"
import { getAllFoodItems } from "~/data/firebaseFunction";
import { useStateValue } from '~/context/StateProvider';
import CartContainer from '../CartContainer';
import productApi from '~/api/productAPI';

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    // const [foodItems, setFoodItems] = useState([]);
    const [{ foodItems, cartShow }, dispatch] = useStateValue();

    // const fetchData = async () => {
    //     await getAllFoodItems().then((data) => {
    //         dispatch({
    //             type: actionType.SET_FOOD_ITEMS,
    //             foodItems: data,
    //         })
    //         console.log(data);
    //     })
    // }
    // useEffect(() => { fetchData() }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAll();
                // console.log(response);
                dispatch({
                    type: actionType.SET_FOOD_ITEMS,
                    foodItems: response,
                })
            }
            catch (error) {
                console.log('Fail to fetch product: ', error);
            }
        }

        fetchProducts();
    }, [])


    return (
        <AnimatePresence>

            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <HomeContainer data={foodItems} />
                    {children}
                </div>

            </div>

        </AnimatePresence>
    );
}

export default DefaultLayout;