import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

import style from './Search.module.scss'

const cx = classNames.bind(style);
function Search() {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder='Search'
                    spellCheck={false}
                    onChange={e => setSearchValue(e.target.value)}
                />

                {searchValue && (
                    <button className={cx('clear')}
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon className={cx('')} icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>);
}

export default Search;