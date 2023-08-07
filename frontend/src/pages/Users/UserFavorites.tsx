import React, { useEffect, useState } from 'react'
import { Item } from '../../interfaces/ItemType';
import { getFavorites } from '../../services/apiServices';
import { Col, Container, Row } from 'react-bootstrap';
import StoreItem from '../../components/StoreItem';
import UserMenu from './UserMenu';

type Props = {}

const UserFavorites = (props: Props) => {
   const [favItems, setFavCards] = useState<Array<Item>>([]);

  useEffect(() => {
    getFavorites().then((json) => {
      setFavCards(json);
    });
  }, []);
  
  return (
     <Container className="d-flex">
       <div className="col-md-3 me-5">
         
            <UserMenu/>
          </div>
      {favItems.length < 1 && <h2 className="m-5">Add a favorite item</h2>}
      <Row md={2} xs={3} lg={3} className="g-3 ms-3 w-100">
        {favItems.map((item) => (
          <Col key={item._id}>
            {favItems?.length < 1 && <div>No results found</div>}

            <StoreItem {...item} slug={item.slug} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default UserFavorites