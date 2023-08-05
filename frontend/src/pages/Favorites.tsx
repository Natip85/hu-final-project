import React, { useEffect, useState } from 'react'
import { Item } from '../interfaces/ItemType';
import { getFavorites } from '../services/apiServices';
import { Col, Row } from 'react-bootstrap';
import StoreItem from '../components/StoreItem';

type Props = {}

const Favorites = (props: Props) => {
    const [favItems, setFavCards] = useState<Array<Item>>([]);

  useEffect(() => {
    getFavorites().then((json) => {
      
      setFavCards(json);
    });

  }, []);
  return (
     <Row md={2} xs={3} lg={3} className="g-3 ms-3 w-100">
          {favItems.map((item) => (
            <Col key={item._id}>
              {favItems?.length < 1 && <div>No results found</div>}
            
                <StoreItem {...item} slug={item.slug} />
         
            </Col>
          ))}
        </Row>
  )
}

export default Favorites