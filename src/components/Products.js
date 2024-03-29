import React from 'react';
import s from "../css/products.module.css";
import Button from "./Button";

function Products(props) {

  return (
    <div>
      <div className={s.products__container}>
        <ol className={s.products}>
        {
          props.products.map(x => (
            <li className={s.products__item}>
              <div className={s.products__itemImg}>
                <img src={x.img} className={s.products__itemImgIcon} /> 
              </div>
              <div className={s.products__itemText}>
                <span className={s.products__itemTitle}> {x.id} </span>
                <span className={s.products__itemDescription}> {x.text} </span>
              </div>
              <div className={s.products__itemActions}>
                <Button className={s.products__itemAddToCart} onClick={() => props.onAddToCartClick(x)} styleType="button-default">Add to cart</Button>
                <div className={s.products__itemCost}> € {x.cost.toFixed(2)} </div>
              </div>
            </li>
          ))
        }
        </ol>
      </div>
    </div>
  );
}
export default Products;