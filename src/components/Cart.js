import React from 'react';
import Payment from "./Payment";

function Cart(props) {

  let total = props.cart.reduce(function(prev, current) {
    return prev + current.cost;
  }, 0);
  
  return (
    <div>
      <ol className={""}>
        {
          props.cart.map(x => (
            <li className={""}>
              <div className={""}> {x.id} : €{x.cost} </div>
            </li>
          ))
        }
      </ol>
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