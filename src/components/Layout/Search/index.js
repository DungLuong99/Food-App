import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HeadlessTippy from '@tippyjs/react/headless';

import style from './Search.module.scss'
import { useDebounce } from '~/hooks';
import productApi from '~/api/productAPI';
import MenuContainer from '../MenuContainer';
import { useStateValue } from '~/context/StateProvider';
import { actionType } from '~/context/reducer';

const cx = classNames.bind(style);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const [{ searchResult }, dispatch] = useStateValue();

    const debounced = useDebounce(searchValue, 800);

    const inputRef = useRef();
    // console.log(searchResult);
    useEffect(() => {
        if (!debounced.trim()) {
            // searchResult([]);
            dispatch({
                type: actionType.SET_SEARCH_RESULT,
                searchResult: null
            })
            return
        }
        setLoading(true);
        productApi.searchProducts(debounced)
            .then(res => {

                // console.log(res);
                // setSearchResult(res);

                dispatch({
                    type: actionType.SET_SEARCH_RESULT,
                    searchResult: res
                })
                setLoading(false)
            })
            .catch(() => setLoading(false));
    }, [debounced])

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }

    const handleHideResult = () => {
        setShowResult(false);
    }
    return (
        // <HeadlessTippy
        //     interactive
        //     visible={showResult && searchResult.length > 0}
        //     render={attrs => (
        //         <div className={cx('search-result')} tabIndex="-1" {...attrs}>
        //         </div>
        //     )}
        //     onClickOutside={handleHideResult}
        // >
        <div className={cx('search')}>
            <input
                ref={inputRef}
                value={searchValue}
                placeholder='Search'
                spellCheck={false}
                onChange={e => setSearchValue(e.target.value)}
                onFocus={() => setShowResult(true)}
            />

            {searchValue && !loading && (
                <button className={cx('clear')}
                    onClick={handleClear}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

            <button className={cx('search-btn')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
        // </HeadlessTippy>
    );
}


export default Search;