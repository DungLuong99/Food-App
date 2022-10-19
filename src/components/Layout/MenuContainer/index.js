import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'

import style from './MenuContainer.module.scss'
import { categories } from '~/data/introItems'
import { useStateValue } from '~/context/StateProvider';
// import { } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { motion } from 'framer-motion';
import RowContainer from '../RowContainer'

const cx = classNames.bind(style);


function MenuContainer({ data }) {

    const [filter, setFilter] = useState("chicken");
    const [{ foodItems, sortState }, dispatch] = useStateValue();
    // console.log(data);
    const [dataSorted, setDataSorted] = useState();


    // console.log(dataSorted);

    // if (sortState === null) {
    //     setDataSorted(data)
    // } else {
    //     data.map((a, b) => { console.log(a, b); })
    //     // data.sort((a, b) => {
    //     //     const { price, updateAt } = a;
    //     //     const { price: priceB, updateAt: updateAtB } = b;
    //     //     console.log(a, b);
    //     //     switch (sortState) {
    //     //         case 'priceDesc':
    //     //             return priceB - price;
    //     //         case 'priceAsc':
    //     //             return price - priceB;
    //     //         case null:
    //     //             return data;
    //     //         default:
    //     //             return data
    //     //     }
    //     // })
    // }

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
                data={data?.filter((item) => item.category === filter)}
            />
        </div>


    </div>);
}

export default MenuContainer;