import React, { useEffect, useState } from "react";
import { Category } from "../../interfaces/CategoryType";
import { Modal, Select } from "antd";
import {
  addItem,
  getCategories,
  getSingleItem,
  updateItem,
} from "../../services/apiServices";
import AdminMenu from "./AdminMenu";
import { Button, Container } from "react-bootstrap";
import ProductForm from "../../components/ProductForm";
import { Item } from "../../interfaces/ItemType";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

type Props = {};

const EditProduct = (props: Props) => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [shipping, setShipping] = useState(false);
  const [name, setName] = useState<any>('');
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState("");
  const [size, setSize] = useState("");
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<Item>();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
     if (!params) return;
    getAllCategories();
    getProduct()
  }, [params]);

  function getAllCategories() {
    getCategories().then((json) => {
      setCategories(json);
    });
  }

  const getProduct = async () => {
    if (!params) return;
    await getSingleItem(params.id).then((json) => {
      setProduct(json)
      
      
      setName(json.name);
      setPhoto(json.photo);
      setDescription(json.description);
      setPrice(json.price);
      setQuantity(json.quantity);
       setShipping(json.shipping)
       setCategory(json.category)
       setSize(json.size)
    });
  };


  async function handleUpdate() {
    if (!params) return;
    await updateItem(product?._id, {
      category,
      photo,
      name,
      description,
      price,
      quantity,
      shipping,
      size
    }).then((json) => {
      if (json.success) {
          toast.success(`${json.message}`);
        setTimeout(() => {
           navigate("/dashboard/admin/products");
        }, 1500);
       
      } else {
        toast.error(`${json.message}`);
      }
    });
  }

  async function handleSubmit(item: Item) {
    await addItem(item).then((json) => {
      if (!json.success) {
        toast.error(`${json.message}`);
      } else {
        toast.success(`Product created`);
        setVisible(false);
        navigate("/dashboard/admin/products");
      }
    });
  }

  return (
    <div className="col-md-9 d-flex justify-content-center w-100">
      <div className="col-md-3 me-5">
        <AdminMenu />
      </div>
      <Container>
        <Container className="d-flex justify-content-end">
          <Button
            className="mb-5"
            variant="success"
            onClick={() => {
              setVisible(true);
            }}
          >
            + Add a Product
          </Button>
        </Container>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <ProductForm handleSubmit={handleSubmit} />
        </Modal>
        <div className=" w-75">
          <h1 className="mb-5 text-center">Edit a Product</h1>
          <label htmlFor="">Select a category <span className="text-danger">*</span></label>
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
               <label htmlFor="">Product size <span className='text-danger'>*</span></label>
            <input
              type="text"
              value={size}
              className="form-control"
              onChange={(e) => setSize(e.target.value)}
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
              value={shipping}
            >
              <Option value={false}>No</Option>
              <Option value={true}>Yes</Option>
            </Select>
          </div>
          <div className="mb-3">
            <button
              style={{ width: "48.5%" }}
              type="button"
              className="btn btn-danger  m-1"
              onClickCapture={() => navigate("/dashboard/admin/products")}
            >
              CANCEL
            </button>
            <button
              style={{ width: "48.5%" }}
              onClick={handleUpdate}
              type="button"
              className="btn btn-primary  m-1"
            >
              UPDATE
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditProduct;
