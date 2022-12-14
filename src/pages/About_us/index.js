import classNames from 'classnames/bind'

import style from './About_us.module.scss'
import Coming from '~/assets/img/coming.png'
import { Header } from '~/components/Layout';

const cx = classNames.bind(style);

function About_us() {
    return (<div>
        <Header />
        <img
            className={cx('coming')}
            src={Coming}
            alt=''
        />
    </div>);
}

export default About_us;