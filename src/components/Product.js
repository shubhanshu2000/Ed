import React from "react";

const Product = ({ product_id, name, stock, sellin_price }) => {
  return (
    <>
      <section className="h-[150px] w-[150px]">
        <div className="" key={product_id}>
          <h1>{name}</h1>

          <p>{stock}</p>
          <h4>{sellin_price}</h4>
        </div>
      </section>
    </>
  );
};

export default Product;
