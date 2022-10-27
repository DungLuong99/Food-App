import classNames from 'classnames/bind'

import style from './Menu.module.scss'
import { Header } from "~/components/Layout";
import MenuContainer from "~/components/Layout/MenuContainer";
import SideBar from "~/components/Layout/SideBar";
import { useStateValue } from '~/context/StateProvider'
import CartContainer from '~/components/Layout/CartContainer'
import Footer from '~/components/Layout/Footer';

const cx = classNames.bind(style);

function Menu() {
    const [{ foodItems, searchResult, cartShow, sortResult }, dispatch] = useStateValue();
    // console.log(foodItems);

    return (

        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('sidebar')}>
                    <SideBar />
                </div>
                <div>
                    <MenuContainer data={searchResult || foodItems} />
                    {cartShow && <CartContainer />}

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Menu;