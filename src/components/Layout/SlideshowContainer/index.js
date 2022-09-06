import classNames from 'classnames/bind'
import { motion } from 'framer-motion';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { useStateValue } from '~/context/StateProvider';
import style from './SlideshowContainer.module.scss';
import RowContainer from '../RowContainer';

const cx = classNames.bind(style);

function SlideshowContainer() {

    const [{ foodItems }, dispatch] = useStateValue();
    const [scrollValue, setScrollValue] = useState(0);

    return (
        <div className={cx('slide-show')}>
            <div className={cx('slide-title')}>
                <p>Our Fresh and Healthy Fruits</p>

                <div className={cx('slide-button')}>
                    <motion.div
                        whileTap={{ scale: 0.5 }}
                        className={cx('button-left')}
                        onClick={() => setScrollValue(-200)}
                    >
                        <LeftOutlined />
                    </motion.div>

                    <motion.div
                        whileTap={{ scale: 0.5 }}
                        className={cx('button-right')}
                        onClick={() => setScrollValue(200)}
                    >
                        <RightOutlined />
                    </motion.div>
                </div>
            </div>

            <div className={cx('slide-content')}>
                <RowContainer
                    data={foodItems?.filter((n) => n.category === 'fruits')}
                    scrollValue={scrollValue}
                />
            </div>

        </div>
    )
}

export default SlideshowContainer;