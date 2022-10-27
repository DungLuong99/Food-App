import { useState, useEffect, Fragment } from 'react'
import {
    LoadingOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    BankFilled,
    DollarCircleOutlined
} from '@ant-design/icons';
import classNames from 'classnames/bind'

import { motion } from 'framer-motion'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import style from './CreateContainer.module.scss'
import Header from '../Header';
import { categories } from '~/data/introItems';

import { useStateValue } from '~/context/StateProvider'
import productApi from '~/api/productAPI';

const cx = classNames.bind(style)

function CreateContainer(data) {

    const [title, setTitle] = useState(data.title || '');
    const [calories, setCalories] = useState(data.calories || '');
    const [price, setPrice] = useState(data.price || '');
    const [category, setCategory] = useState(data.category || null);
    const [imageAsset, setImageAsset] = useState(data.image?.imageURL || undefined);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log(imageAsset);
    const handlePreview = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImageAsset(file);
    }

    useEffect(() => {
        //Cleanup
        return () => {
            imageAsset && URL.revokeObjectURL(imageAsset.preview)
        }
    }, [imageAsset])

    const deleteImage = () => {
        setIsLoading(false);
        setImageAsset();
    }

    const saveData = () => {
        const formData = new FormData();
        formData.append("file", imageAsset)
        formData.append("upload_preset", "uqfyyrfz")

        productApi.postImage(formData)
            .then((res) => {
                const data = {
                    title: title,
                    image: {
                        imageURL: res.data.url,
                        public_id: res.data.public_id,
                    },
                    category: category,
                    calories: calories,
                    quantity: 1,
                    price: price,
                }
                console.log(res);
                productApi.postProduct(data)
                clearData();
            })
    }

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select Category");
    }

    const [{ foodItems }, dispatch] = useStateValue();

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>

                <div className={cx('notice')}>
                    {
                        fields && (
                            (alertStatus === 'danger') ? (
                                <motion.p className={cx('notice-fail')}>
                                    {msg}
                                </motion.p>) : (
                                (<motion.p className={cx('notice-success')}>
                                    {msg}
                                </motion.p>
                                )
                            ))
                    }
                </div>


                <div className={cx('title')}>
                    <FontAwesomeIcon icon={faBurger} />
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Please enter title...'
                    />
                </div>

                <div className={cx('categories')}>
                    <select
                        onChange={e => setCategory(e.target.value)}>
                        <option value='other'>
                            Select Category
                        </option>
                        {categories && categories.map(item => (
                            <option
                                key={item.id}
                                value={item.urlParamName}
                                className={cx('category-item')}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('loading')}>
                    {isLoading ? (<LoadingOutlined />) : (
                        <Fragment>
                            {!imageAsset ? (
                                <Fragment>
                                    <label className={cx('upload-image')}>
                                        <div className={cx('upload-icon')}>
                                            <CloudUploadOutlined />
                                            <p>Click here to upload</p>
                                        </div>
                                        <input
                                            type='file'
                                            name='uploadImage'
                                            accept='image/*'
                                            onChange={handlePreview}
                                        />
                                    </label>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className={cx('uploaded')}>
                                        <img
                                            src={imageAsset.preview}
                                            alt='uploaded'
                                        />
                                        <button
                                            type='button'
                                            onClick={deleteImage}
                                        >
                                            <DeleteOutlined />
                                        </button>
                                    </div>
                                </Fragment>)
                            }

                        </Fragment>)}
                </div>

                <div className={cx('calories')}>
                    <div className={cx('calories-content')}>
                        <BankFilled className={cx('calories-icon')} />
                        <input
                            type='number'
                            required
                            value={calories}
                            onChange={e => setCalories(e.target.value)}
                            placeholder='Calories'
                        />
                    </div>
                </div>

                <div className={cx('price')}>
                    <div className={cx('price-content')}>
                        <DollarCircleOutlined className={cx('price-icon')} />
                        <input
                            type='number'
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder='Price'
                        />
                    </div>
                </div>

                <div className={cx('save')}>
                    <button
                        onClick={saveData}>
                        Save
                    </button>
                </div>
            </div>
        </div>

    );
}

export default CreateContainer;