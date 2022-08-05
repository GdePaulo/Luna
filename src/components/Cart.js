import React from 'react';
import Payment from "./Payment";

function Cart(props) {

  let total = Object.values(props.cart).reduce((total, current) => total + current.cost * current.quantity, 0);
  
  return (
    <div>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Cost</th>
        </tr>
        {
          Object.values(props.cart).map((x, key) => (
            <tr key={key}>
              <td>{x.img}</td>
              <td>{x.id}</td>
              <td>{x.quantity}</td>
              <td>{x.cost}</td>
            </tr>
          ))
        }
      </table>
      {/* <ol className={""}>
        {
          props.cart.map(x => (
            <li className={""}>
              <div className={""}> {x.id} : €{x.cost} </div>
            </li>
          ))
        }
      </ol>*/}
      {
        <div>
          Total: €{total}
        </div>
      } 
      <Payment total={total}/>
    </div>
  );
}
export default Cart;