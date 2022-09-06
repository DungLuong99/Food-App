import { useState, useEffect, Fragment } from 'react'
import {
    LoadingOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    BankFilled,
    DollarCircleOutlined
} from '@ant-design/icons';
import classNames from 'classnames/bind'
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable
} from 'firebase/storage';
import { motion } from 'framer-motion'

import style from './CreateContainer.module.scss'
import Header from '../Header';
import { categories } from '~/data/introItems';
import { storage } from '~/firebase.config';
import { saveItem } from '~/data/firebaseFunction';
import { getAllFoodItems } from "~/data/firebaseFunction";
import { actionType } from '~/context/reducer'
import { useStateValue } from '~/context/StateProvider'

const cx = classNames.bind(style)

function CreateContainer() {

    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Image/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setFields(true);
            setMsg('Error while uploading: Please try again!');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 5000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoading(false);
                    setFields(true);
                    setMsg('Uploaded a photo!');
                    setAlertStatus('success');
                    setTimeout(() => {
                        setFields(false);
                    }, 5000)
                })
        })
    };

    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg('Image deleted successfully!');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false);
            }, 5000)
        })
    }

    const saveDetails = () => {
        setIsLoading(true);
        const data = {
            id: `${Date.now()}`,
            title: title,
            imageURL: imageAsset,
            category: category,
            calories: calories,
            quantity: 1,
            price: price,
        }

        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFields(true);
                setMsg("Required fields can't be empty");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            } else {
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                setMsg('Data uploaded successfully!');
                setAlertStatus('success');
                clearData();
                setTimeout(() => {
                    setFields(false);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg('Error while uploading: Please try again!');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 5000);
        }

        fetchData();
    }

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select Category");
    }

    const [{ foodItems }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);
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
                    <i class="fa-solid fa-burger"></i>
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Please enter title...'
                    />
                </div>

                <div className={cx('categories')}>
                    <select onChange={e => setCategory(e.target.value)}>
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
                                    <label>
                                        <div className={cx('upload-icon')}>
                                            <CloudUploadOutlined />
                                            <p>Click here to upload</p>
                                        </div>
                                        <input
                                            type='file'
                                            name='uploadimage'
                                            accept='image/*'
                                            onChange={uploadImage}
                                        />
                                    </label>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className={cx('uploaded')}>
                                        <img
                                            src={imageAsset}
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
                        onClick={saveDetails}>
                        Save
                    </button>
                </div>
            </div>
        </div>

    );
}

export default CreateContainer;