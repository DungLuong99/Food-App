import classNames from 'classnames/bind'

import style from './Menu.module.scss'
import { Header } from "~/components/Layout";
import MenuContainer from "~/components/Layout/MenuContainer";
import SideBar from "~/components/Layout/SideBar";
import { useStateValue } from '~/context/StateProvider'
import CartContainer from '~/components/Layout/CartContainer'

const cx = classNames.bind(style);

function Menu() {
    const [{ foodItems, searchResult, cartShow, sortResult }, dispatch] = useStateValue();
    // console.log(sortResult);

    return (

        <div>
            <Header />
            <div className={cx('wrapper')}>
                <div>
                    <SideBar />
                </div>
                <div>
                    <MenuContainer data={searchResult || foodItems} />
                    {cartShow && <CartContainer />}

                </div>
            </div>
        </div>
    )
}

export default Menu;