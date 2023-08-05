import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { Category } from '../interfaces/CategoryType';
import { getCategories } from '../services/apiServices';

const { Option } = Select;

interface FormProps  {
  handleSubmit: Function
}

const ProductForm = ({handleSubmit}: FormProps) => {
    const [categories, setCategories] = useState<Array<Category>>([]);
 const [shipping, setShipping] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  
   useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    getCategories().then((json) => {
      setCategories(json);
    });
  }
  
  function handleClick(){
    handleSubmit({
shipping,
name,
description,
price,
quantity,
category,
photo,
    })
  }

  return (
     <div className=' w-75 mx-auto'>
            <div className="col-md-9  w-100">
              <h1>Create a Product</h1>
              <div className=" w-100 ">
                <label htmlFor="">Select a category <span className='text-danger'>*</span></label>
                <Select
                  bordered={false}
                  placeholder="Select an option"
                  size="small"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className=" col-md-12">
                    Add an Image Url <span className="text-danger">*</span>
                    <input
                      type="text"
                      value={photo}
                      className="form-control"
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={photo}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                    <label htmlFor="">Product name <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                     <label htmlFor="">Product description <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    value={description}
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                     <label htmlFor="">Product price <span className='text-danger'>*</span></label>
                  <input
                    type="number"
                    value={price}
                    className="form-control"
                    onChange={(e: any) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                     <label htmlFor="">Product quantity <span className='text-danger'>*</span></label>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Product quantity"
                    className="form-control"
                    onChange={(e: any) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                     <label htmlFor="">Shipping offered? <span className='text-danger'>*</span></label>
                  <Select
                    bordered={false}
                    placeholder="Select an option"
                    size="small"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value={false}>No</Option>
                    <Option value={true}>Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button  onClick={handleClick} type="button" className="btn btn-primary">
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ProductForm