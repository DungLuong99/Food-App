import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'

import style from './MenuContainer.module.scss'
import { categories } from '~/data/introItems'
import { useStateValue } from '~/context/StateProvider';
import { } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { motion } from 'framer-motion';
import RowContainer from '../RowContainer'

const cx = classNames.bind(style);


function MenuContainer() {

    const [filter, setFilter] = useState("chicken");
    const [{ foodItems }, dispatch] = useStateValue();

    const currentFilter = () => {

    }

    return (<div className={cx('wrapper')}>
        <p className={cx('title')} >
            Our Hot Dishes
        </p>
        <div className={cx('inner')}>

            <div className={cx('filter-category')}>
                {categories?.map((category) => (
                    <motion.div
                        key={category.id}
                        className={cx(filter === category.urlParamName
                            ? 'category-selected'
                            : 'category')}
                        whileTap={{ scale: 1.5 }}
                        onClick={() =>
                            setFilter(category.urlParamName)
                        }
                    >
                        <div className={cx('category-icon')} >
                            {category.icon}
                        </div>
                        <p className={cx('category-name')}>
                            {category.name}
                        </p>
                    </motion.div>
                ))}
            </div>

        </div>
        <div className={cx('category-items')}>
            <RowContainer
                data={foodItems?.filter((item) => item.category === filter)}
            />
        </div>


    </div>);
}

export default MenuContainer;