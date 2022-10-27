import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';

import style from './Search.module.scss'
import { useDebounce } from '~/hooks';
import productApi from '~/api/productAPI';
import { useStateValue } from '~/context/StateProvider';
import { actionType } from '~/context/reducer';

const cx = classNames.bind(style);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const [{ searchResult }, dispatch] = useStateValue();

    const debounced = useDebounce(searchValue, 800);

    const inputRef = useRef();
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
    );
}


export default Search;