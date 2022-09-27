import classNames from 'classnames/bind'
import { Table } from 'antd';

import style from './ModifyContainer.module.scss'
import Header from '../Header';
import 'antd/dist/antd.less';

import { useStateValue } from '~/context/StateProvider';

const cx = classNames.bind(style)

function ModifyContainer() {
    const [{ foodItems }] = useStateValue();

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 1
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 2
        },
        {
            title: 'image',
            dataIndex: 'image',
            key: 3
        },
        {
            title: 'calories',
            dataIndex: 'calories',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            key: 4
        },
        {
            title: 'price',
            dataIndex: 'price',
            sorter: (a, b) => a.age - b.age,
            key: 5
        },
    ]

    console.log(foodItems);
    return (
        <div className={cx('wrapper')}>

            <Header />
            <div className={cx('inner')}>
                {foodItems ? (
                    <div>
                        <Table columns={columns} dataSource={foodItems} />
                    </div>
                ) : (
                    <div>No</div>
                )}
            </div>
        </div>);
}

export default ModifyContainer;

