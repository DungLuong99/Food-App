import classNames from 'classnames/bind'

import style from './Service.module.scss'
import Coming from '~/assets/img/coming.png'
import { Header } from '~/components/Layout';

const cx = classNames.bind(style);

function Service() {
    return (<div>
        <Header />
        <img
            className={cx('coming')}
            src={Coming}
            alt=''
        />
    </div>);
}

export default Service;