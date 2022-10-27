import classNames from 'classnames/bind'
import { Fragment, useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';

import { Button, Table, Modal, Input, Space } from "antd";
import style from './ModifyContainer.module.scss'
import Header from '../Header';
import { useStateValue } from '~/context/StateProvider';
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import productApi from '~/api/productAPI';
import { actionType } from '~/context/reducer';

const cx = classNames.bind(style)

function ModifyContainer() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataSource, setDataSource] = useState(foodItems);
  const [imageAsset, setImageAsset] = useState();
  const [addProduct, setAddProduct] = useState();

  const handlePreview = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    console.log(file, file.preview);
    setImageAsset(file);
  }

  const deleteImage = () => {
    setImageAsset();
  }
  useEffect(() => {
    //Cleanup
    return () => {
      imageAsset && URL.revokeObjectURL(imageAsset.preview)
    }
  }, [imageAsset])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        // console.log(response);
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: response,
        })
      }
      catch (error) {
        console.log('Fail to fetch product: ', error);
      }
    }

    fetchProducts();
  }, [])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => {
        return a.name.length - b.name.length
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: "3",
      title: "category",
      dataIndex: "category",
      filters: [
        {
          text: 'chicken',
          value: 'chicken',
        },
        {
          text: 'cury',
          value: 'cury',
        },
        {
          text: 'rice',
          value: 'rice',
        },
        {
          text: 'fish',
          value: 'fish',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      key: "4",
      title: "calories",
      dataIndex: "calories",
      sorter: (a, b) => a.calories - b.calories,
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: "5",
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      ky: "6",
      title: "Image",
      render: (record) => {
        return (
          <img
            src={record?.image?.imageURL}
            style={{ width: 50 }}
            alt=''
          />)
      },
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditProduct(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteProduct(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddProduct = () => {
  };
  const onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          productApi.deleteProduct(record.id)
          return pre.filter((product) => product.id !== record.id);
        });
      },
    });
  };
  const onEditProduct = (record) => {
    const data = { ...record };
    data.preview = record.image.imageURL;
    setIsEditing(true);
    setImageAsset(data)
    setEditingProduct({ ...data });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        {/* <Button onClick={onAddProduct}>Add a new Product</Button> */}
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Product"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((product) => {
                if (product.id === editingProduct.id) {
                  const formData = new FormData();
                  formData.append("file", imageAsset)
                  formData.append("upload_preset", "uqfyyrfz")

                  productApi.postImage(formData).then((res) => {
                    editingProduct.image.imageURL = res.data.url;
                    editingProduct.image.public_id = res.data.public_id;
                  }
                  )
                  productApi.putProduct(product.id, editingProduct)
                } else {
                  return product;
                }
              });
            });
            resetEditing();
          }}
        >
          <div className={cx('input-modify')}>
            name
            <Input
              value={editingProduct?.name}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
            />
          </div>


          <div className={cx('input-modify')}>
            <p>calori</p>
            <Input
              value={editingProduct?.calories}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  return { ...pre, calories: e.target.value };
                });
              }}
            />
          </div>

          <div className={cx('input-modify')}>
            <p>price</p>

            <Input
              value={editingProduct?.price}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  return { ...pre, price: e.target.value };
                });
              }}
            />
          </div>
          {imageAsset ? (
            <Fragment>
              <div className={cx('uploaded')}>
                <img
                  src={imageAsset.preview} style={{ width: 50 }}
                  alt='uploaded'
                />
                <button
                  type='button'
                  onClick={deleteImage}
                >
                  <DeleteOutlined />
                </button>
              </div>
            </Fragment>

          ) : (
            <Fragment>
              <label className={cx('upload-image')}>
                <input
                  type='file'
                  name='uploadImage'
                  accept='image/*'
                  onChange={handlePreview}
                />
              </label>
            </Fragment>
          )
          }
        </Modal>
      </header>
    </div >
  );

}


export default ModifyContainer;

