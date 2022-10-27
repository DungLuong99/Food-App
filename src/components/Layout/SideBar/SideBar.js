import classNames from 'classnames/bind'

import { actionType } from '~/context/reducer';
import { useStateValue } from '~/context/StateProvider';
import Search from '../Search';
import Select from '../Select';
import style from './SideBar.module.scss'

const cx = classNames.bind(style);

function SideBar() {

    const [{ foodItems }, dispatch] = useStateValue();
    // console.log(foodItems);
    return (
        <div className={cx('wrapper')}>

            <Search />
            <Select
                name="sort"
                onChange={(e) => {
                    const sortBy = e.target.value;
                    console.log(sortBy);
                    dispatch({
                        type: actionType.SET_SORT_STATE,
                        sortState: sortBy
                    })
                }}
                label="sortBy"
                options={[
                    {
                        label: 'Name',
                        value: 'name',
                    },
                    {
                        label: 'Price High',
                        value: 'priceDesc',
                    },
                    {
                        label: 'Price Low',
                        value: 'priceAsc',
                    },
                ]}
            />
        </div>
    );
}

export default SideBar;