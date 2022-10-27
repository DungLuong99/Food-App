import classNames from 'classnames/bind'

import style from './Select.module.scss'

const cx = classNames.bind(style);

function Select({ options, label, name, defaultValue, onChange }) {
    return (<div>
        <select
            onChange={onChange}
            name={name}
            // defaultValue={defaultValue}
            className={cx('wrapper')}
        >
            <option value="" disabled>
                {label}
            </option>
            {options.map((option, key) => (
                <option key={key} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>);
}

export default Select;