import React from 'react';
import Payment from "./Payment";
import s from "../css/cart.module.css";

function Cart(props) {

  let total = Object.values(props.cart).reduce((total, current) => total + current.cost * current.quantity, 0);
  
  return (
    <div>
      <table className={s.cart__products}>
        <tr>
          <th className={s.cart__img}>Img</th>
          <th className={s.cart__name}>Name</th>
          <th className={s.cart__quantity}>Qnt.</th>
          <th className={s.cart__cost}>Cost</th>
        </tr>
        {
          Object.values(props.cart).map((x, key) => (
            <tr key={key}>
              <td className={s.product__img}><img className={s.product__imgIcon} src={x.img} ></img></td>
              <td className={s.product__name}>{x.id}</td>
              <td className={s.product__quantity}>{x.quantity}</td>
              <td className={s.product__cost}>€{x.cost.toFixed(2)}</td>
            </tr>
          ))
        }
      </table>
      
      <div>
        Total: €{total.toFixed(2)}
      </div>
      <Payment total={total}/>
    </div>
  );
}
export default Cart;