import classNames from 'classnames/bind'

import style from './MenuContainer.module.scss'
import { categories } from '~/data/introItems'
import { useStateValue } from '~/context/StateProvider';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RowContainer from '../RowContainer'

const cx = classNames.bind(style);


function MenuContainer({ data }) {
    // data truyen vao là 1 mang các obj sản phẩm

    const [filter, setFilter] = useState("chicken");
    const [{ sortState }, dispatch] = useStateValue();
    // console.log(data); 
    const [dataSorted, setDataSorted] = useState(data);

    console.log("dataSorted", dataSorted);
    console.log("sortState", sortState);

    // console.log("sortState", sortState);

    useEffect(() => {

        if (sortState === 'priceDesc') {
            setDataSorted(data.sort((a, b) => {
                return a.price - b.price
            }))
        } else if (sortState === 'priceAsc') {
            setDataSorted(data.sort((a, b) => {
                return b.price - a.price
            }))
        } else if (sortState === null) {
            setDataSorted(data)
        }

        // switch (sortState) {
        //     case 'priceDesc':
        //         setDataSorted(data.sort((a, b) => {
        //             return a.price - b.price
        //         }))
        //         break
        //     case 'priceAsc':
        //         setDataSorted(data.sort((a, b) => {
        //             return b.price - a.price
        //         }))
        //         break
        //     case null:
        //         return data;
        //     default:
        //         return data
        // }

        // console.log(data?.sort((a, b) => {
        //     return b.price - a?.price
        // }));
    }, [sortState, data])


    // useEffect(() => {
    //     if (dataSorted) setDataSorted(pre => console.log("pre", pre))
    //     // pre.filter((item) => item.category === filter))
    // }, [filter, dataSorted])

    // useEffect(() => {
    //     if (data) { setDataSorted(data) }
    // }, [data])

    // console.log(dataSorted);

    // if (sortState === null) {
    //     return setDataSorted(data)

    // } else {
    // setDataSorted(
    // data.sort((a, b) => {
    //     const { price, updateAt } = a;
    //     const { price: priceB, updateAt: updateAtB } = b;
    //     console.log(a, b);
    //     switch (sortState) {
    //         case 'priceDesc':
    //             return priceB - price;
    //         case 'priceAsc':
    //             return price - priceB;
    //         case null:
    //             return data;
    //         default:
    //             return data
    //     }
    // })
    // )
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
                data={dataSorted?.filter((item) => item.category === filter)}
            // ?.filter((item) => item.category === filter)}
            />
        </div>


    </div>);
}

export default MenuContainer;