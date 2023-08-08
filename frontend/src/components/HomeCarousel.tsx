import React, { useEffect, useState } from 'react'
import { Carousel } from "react-bootstrap";
import { getItems } from '../services/apiServices';
import { Item } from '../interfaces/ItemType';
type Props = {}

const HomeCarousel = (props: Props) => {
 const [allItems, setAllItems] = useState<Array<Item>>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
   
    getAllProducts();
   

  }, []);

     async function getAllProducts() {
    await getItems().then((json) => {
      setAllItems(json);
    });
  }

  const handleSelect = (selectedIndex: any, e: any) => {
    // console.log("selected index: ", selectedIndex);
    setIndex(selectedIndex);
  };
  
  return (
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
  )
}

export default HomeCarousel