import React, { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { formatCurrency } from '../utilities/FormatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
// import storeItems from "../data/items.json"
import { Item } from '../interfaces/ItemType'
import { getItems } from '../services/apiServices'

interface cartProp  {
  id?: string
  quantity: number
}

const CartItem = ({id, quantity}: cartProp) => {
  const { removeFromCart } = useShoppingCart()
   const [allItems, setAllItems] = useState<Array<Item>>([])

  useEffect(()=>{
    getItems().then((json)=>{
      
      setAllItems(json)
    })
  }, [])

  const item = allItems.find(i => i._id === id)
  
  if (item == null) return null
  return (
     <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.photo}
        alt=''
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price as number)}
        </div>
      </div>
      
      <div> {formatCurrency(item.price  * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item._id as string)}
      >
        &times;
      </Button>
    </Stack>
  )
}

export default CartItem