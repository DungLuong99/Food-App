import classNames from 'classnames/bind'
import { useParams } from 'react-router-dom';
import { actionType } from '~/context/reducer';
import { useStateValue } from '~/context/StateProvider';

import Search from '../Search';
import Select from '../Select';

import style from './SideBar.module.scss'

const cx = classNames.bind(style);

function SideBar() {
    // const [search, setSearch] = useParams();

    const [{ sortResult, foodItems }, dispatch] = useStateValue();
    // console.log(foodItems);
    return (
        <div>
            <Search />
            <Select
                onChange={(e) => {
                    const sortBy = e.target.value;
                    console.log(sortBy);
                    dispatch({
                        type: actionType.SET_SORT_STATE,
                        sortState: sortBy
                    })
                }}
                label="sortBy"
                name="sort"
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