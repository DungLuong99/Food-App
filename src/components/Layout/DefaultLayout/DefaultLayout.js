import classNames from 'classnames/bind'
import { AnimatePresence } from 'framer-motion'

import style from './DefaultLayout.module.scss'
import Header from "~/components/Layout/Header";
import HomeContainer from '~/components/Layout/HomeContainer'
import { useStateValue } from '~/context/StateProvider';
import Footer from '~/components/Layout/Footer'

const cx = classNames.bind(style)

function DefaultLayout({ children, data }) {

    const [{ foodItems, cartShow }, dispatch] = useStateValue();

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