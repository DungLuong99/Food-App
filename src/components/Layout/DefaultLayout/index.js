import classNames from 'classnames/bind'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";

import style from './DefaultLayout.module.scss'
import Header from "~/components/Layout/Header";
import HomeContainer from '~/components/Layout/HomeContainer'
import { actionType } from "~/context/reducer"
import { getAllFoodItems } from "~/data/firebaseFunction";
import { useStateValue } from '~/context/StateProvider';
import CartContainer from '../CartContainer';
import productApi from '~/api/productAPI';
import Footer from '~/components/Layout/Footer'

const cx = classNames.bind(style)

function DefaultLayout({ children, data }) {
    // const [foodItems, setFoodItems] = useState([]);

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

    const [{ foodItems, cartShow }, dispatch] = useStateValue();

    console.log(foodItems);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await productApi.getAll();
    //             dispatch({
    //                 type: actionType.SET_FOOD_ITEMS,
    //                 foodItems: response,
    //             })
    //         }
    //         catch (error) {
    //             console.log('Fail to fetch product: ', error);
    //         }
    //     }

    //     fetchProducts();
    // }, [])


    return (
        <AnimatePresence>

            <div className={cx('wrapper')}>
                <Header />

                <div className={cx('container')}>
                    <HomeContainer data={foodItems} />
                    {children}
                </div>
                <Footer />
            </div>

        </AnimatePresence>
    );
}

export default DefaultLayout;