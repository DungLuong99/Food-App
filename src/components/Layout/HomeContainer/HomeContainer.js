import classNames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'

import style from './HomeContainer.module.scss'
import Delivery from '~/assets/img/delivery.png'
import Hero from '~/assets/img/heroBg.png'
import { heroData } from '~/data/introItems'
import SlideshowContainer from '../SlideshowContainer'
import MenuContainer from '../MenuContainer'
import CartContainer from '../CartContainer'
import { useStateValue } from '~/context/StateProvider'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style);

function HomeContainer({ data }) {

    const [{ foodItems, cartShow }, dispatch] = useStateValue();

    const [scrollValue, setScrollvalue] = useState(0);

    const menuRef = useRef(null);

    const gotoMenu = () => {
        window.scrollTo({

            top: menuRef.current.offsetTop,

            behavior: "smooth",

            // You can also assign value "auto" 

            // to the behavior parameter. 

        });
    }

    useEffect(() => { }, [scrollValue, cartShow]);

    return (<div className={cx('wrapper')}>

        <div className={cx('intro')}>
            <div className={cx('intro-left')}>
                <div className={cx('intro-left-header')}>
                    <p className={cx('intro-left-header-content')}>
                        Bike Delivery
                    </p>

                    <div className={cx('intro-left-header-logo')}>
                        <img src={Delivery}
                            alt='delivery'
                        />
                    </div>
                </div>

                <p className={cx('intro-left-title')}>
                    The Fastest Delivery in
                    <span>Your City</span>
                </p>

                <p className={cx('intro-left-content')}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
                    eaque fugit distinctio est nam voluptatum architecto, porro iusto
                    deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
                    suscipit!
                </p>
                <button
                    type='button'
                    className={cx('button-order')}
                    onClick={gotoMenu}
                >
                    Order Now
                </button>
            </div>

            <div className={cx('intro-right')}>
                <img className={cx('hero')} src={Hero} alt='heroBg' />

                <div className={cx('intro-right-content')}>
                    {heroData && heroData.map(item => (
                        <div key={item.id} className={cx('right-item')}>
                            <img src={item.imageSrc} alt='item' />
                            <p className={cx('right-item-name')}>{item.name}</p>
                            <p className={cx('right-item-ingredient')}>{item.ingredient}</p>
                            <p className={cx('right-item-price')}>
                                <span>$</span>
                                {item.price}
                            </p>
                        </div>

                    ))}
                </div>
            </div>

        </div>
        <SlideshowContainer />
        <MenuContainer data={foodItems} />
        {cartShow && <CartContainer />}
    </div>);
}

export default HomeContainer;