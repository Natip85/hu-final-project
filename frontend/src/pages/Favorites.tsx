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
    <div className='d-flex flex-column align-items-center p-5' >
     {favItems.length <1 && (<h2 className='m-5'>Add a favorite item</h2>)}
     <Row md={2} xs={3} lg={3} className="g-3 ms-3 w-100">
          {favItems.map((item) => (
            <Col key={item._id}>
              {favItems?.length < 1 && <div>No results found</div>}
            
                <StoreItem {...item} slug={item.slug} />
         
            </Col>
          ))}
        </Row>
        </div>
  )
}

export default Favorites