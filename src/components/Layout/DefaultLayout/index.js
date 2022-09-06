import classNames from 'classnames/bind'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

import style from './DefaultLayout.module.scss'
import Header from "~/components/Layout/Header";
import HomeContainer from '~/components/Layout/HomeContainer'
import { actionType } from "~/context/reducer"
import { getAllFoodItems } from "~/data/firebaseFunction";
import { useStateValue } from '~/context/StateProvider';
import CartContainer from '../CartContainer';

const cx = classNames.bind(style)

function DefaultLayout({ children }) {
    const [{ foodItems, cartShow }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            })
        })
    }

    useEffect(() => { fetchData() }, []);

    return (
        <AnimatePresence>

            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <HomeContainer data={foodItems} />
                    {/* {children} */}
                </div>

            </div>

        </AnimatePresence>
    );
}

export default DefaultLayout;