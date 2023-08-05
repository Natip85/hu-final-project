import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Category } from "../interfaces/CategoryType";
import { getCategories } from "../services/apiServices";

const { Option } = Select;

type Props = {
  handleCreate: Function
};

const AddItemForm = ({ handleCreate }: Props) => {
   const [categories, setCategories] = useState<Array<Category>>([]);
  const [shipping, setShipping] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(false);
  const [photo, setPhoto] = useState();
  
    useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    getCategories().then((json) => {
      setCategories(json);
    });
  }
  
  function handleClick() {
    handleCreate({
      shipping,
      name,
      description,
      price,
      quantity,
      category,
      photo
    })

  }

  return (
   <div className="col-md-9 ">
            <h1>Create Product</h1>
            <div className=" w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
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
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e: any) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Product description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Product price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Shipping offered?"
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
                <button className="btn btn-primary" onClick={handleClick}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
  );
};

export default AddItemForm;
