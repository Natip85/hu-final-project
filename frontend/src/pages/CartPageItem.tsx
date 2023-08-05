import React, { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { formatCurrency } from '../utilities/FormatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Item } from '../interfaces/ItemType'
import { getItems } from '../services/apiServices'

interface cartPageProp  {
  id?: string
  quantity: number
}

const CartPageItem = ({id, quantity}: cartPageProp) => {
  const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart()
   const [allItems, setAllItems] = useState<Array<Item>>([])

  useEffect(()=>{
    getItems().then((json)=>{
      
      setAllItems(json)
    })
  }, [])

  const item = allItems.find(i => i._id === id)
  
  if (item == null) return null
  
  return (
   
      <div className='d-flex align-items-center justify-content-around' >
      <img
        src={item.photo}
        alt=''
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="">
        <div style={{minWidth: '150px', maxWidth: '150px'}}>
          {item.name?.substring(0, 15)}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
           <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price as number)}
        </div>
        </div>

       
      </div>
       <div className="d-flex align-items-center justify-content-center" style={{gap:'.3rem'}}>
          <Button onClick={()=>decreaseCartQuantity(id as string)}>-</Button>
          {/* <div> */}
          <span className="text-center" style={{ minWidth: '20px'}}>{quantity}</span> 
          {/* </div> */}
          <Button onClick={()=>increaseCartQuantity(id as string)}>+</Button>
          
        </div>
        <div className='d-flex justify-content-between' style={{ minWidth: '150px'}}>
      <div> {formatCurrency(item.price  * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item._id as string)}
      >
        &times;
      </Button>
      </div>
    </div>
  
  )
}

export default CartPageItem