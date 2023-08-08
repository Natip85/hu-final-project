import { Carousel, Col, Container, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { useContext, useEffect, useState } from "react";
import {
  filterItem,
  getCategories,
  getItemsCount,
  getProductList,
  getSizeFilter,
} from "../services/apiServices";
import { Item } from "../interfaces/ItemType";
import { Checkbox, Radio } from "antd";
import { Category } from "../interfaces/CategoryType";
import { Prices } from "../components/PriceFilters";
import { Sizes } from "../components/SizeFilters";
import { SearchContext } from "../context/SearchContext";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";

const Home = () => {
  const [allItems, setAllItems] = useState<Array<Item>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [checked, setChecked] = useState<any>([]);
  const [radio, setRadio] = useState<any>([]);
  const [sizeRadio, setSizeRadio] = useState<any>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { searchValue } = useContext(SearchContext);
  const [filteredItems, setFilteredItems] = useState<Array<Item>>([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  useEffect(() => {
     getAllSizeProducts()
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeRadio]);

  useEffect(() => {
    if (!checked.length || !radio.length) 
    getAllProducts();
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllCategories();
    getTotalCount();
  }, []);

  const getTotalCount = async () => {
    await getItemsCount().then((json) => {
      setTotal(json.total);
    });
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = async () => {
    setLoading(true);
    await getProductList(page).then((json) => {
      setLoading(false);
      setAllItems([...allItems, ...json]);
    });
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  async function getAllCategories() {
    await getCategories().then((json) => {
      setCategories(json);
    });
  }

  async function getAllProducts() {
    await getProductList(page).then((json) => {
      setAllItems(json);
    });
  }

  async function getAllSizeProducts() {
    await getSizeFilter(sizeRadio).then((json) => {
      setAllItems(json);
    });
  }

  const handleFilter = (value: any, id: any) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    await filterItem({ checked, radio }).then((json) => {
      setAllItems(json);
    });
  };

  useEffect(() => {
    const filtered = allItems.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchValue, allItems]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    // console.log("selected index: ", selectedIndex);
    setIndex(selectedIndex);
  };

  return (
    <>
    {/* <h1 className="text-center text-decoration-underline my-5">SHOP NOW!</h1> */}
    
      <Carousel
      fade
        style={{ maxHeight: "450px" }}
        className="mb-5"
        activeIndex={index}
        onSelect={handleSelect}
        nextIcon={
          <span
            aria-hidden="true"
            className="carousel-control-next-icon changed bg-dark"
          />
        }
        prevIcon={
          <span
            aria-hidden="true"
            className="carousel-control-prev-icon changed bg-dark"
          />
        }
      >
        {allItems.map((slide) => (
          <Carousel.Item
            key={slide.photo}
            interval={2500}
            style={{
                maxHeight: "450px",
                objectFit: "contain",
              }}
          >
            <img
              className="d-block w-100"
              src={slide.photo}
              alt="First slide"
              style={{
                maxHeight: "450px",
                objectFit: "cover",
                opacity: '85%'
              }}
            />
            <Carousel.Caption >
              <h3 className="text-secondary">{slide.name}</h3>
              <p className="text-secondary">{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
<hr/>
      <Container className="d-flex p-0">
        <div className="col-md-2 me-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <h4 className="text-center mt-4">Filter By Size</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setSizeRadio(e.target.value)}>
              {Sizes?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.size}>size {p.size}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-outline-danger mt-4"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        {filteredItems?.length < 1 && (
          <div className="w-100 text-center text-danger">No results found</div>
        )}
        <Row md={2} xs={1} lg={3} className="g-3 ms-3 w-100">
          {filteredItems.map((item) => (
            <Col key={item._id}>
              {allItems?.length < 1 && <div>No results found</div>}
              {skeletonLoading ? (
                <Skeleton />
              ) : (
                <StoreItem {...item} slug={item.slug} _id={item._id} />
              )}
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="text-end mt-5">
        {allItems && allItems.length < total && (
          <button
            className="btn btn-warning"
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Loadmore"}
          </button>
        )}

      </Container>
      <hr/>
       <div className="my-3 text-center">
          {" "}
          <img
            style={{ width: "19rem",margin:'.3rem' }}
            src={
              "https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2021/2021_06_035_onl_new_hp_layout/04_final_output_files/2021_06_035_ONL_Nike_bar_800x280.jpg"
            }
            alt=""
          />
          <img
            style={{ width: "19rem",margin:'.3rem' }}
            src={
              "https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2021/2021_06_035_onl_new_hp_layout/04_final_output_files/2021_06_035_ONL_Adidas_bar_800x280.jpg"
            }
            alt=""
          />
          <img
            style={{ width: "19rem", margin:'.3rem' }}
            src={
              "https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2021/2021_06_035_onl_new_hp_layout/04_final_output_files/2021_06_035_ONL_Jordan_bar_800x280.jpg"
            }
            alt=""
          />
          <Link to={`/categories`}>
          <img
            style={{ width: "19rem", margin:'.3rem' }}
            src={
              "https://images.footlocker.com/content/dam/final/footlockereurope/Online_activations/fl-campaign/2021/2021_06_035_onl_new_hp_layout/04_final_output_files/2021_06_035_ONL_all_brands_bar_en_800x280.jpg"
            }
            alt=""
          />
          </Link>
        </div>
           {/* <hr/> */}
    </>
  );
};

export default Home;
