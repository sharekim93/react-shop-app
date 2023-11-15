"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useFetchCollection from "@/hooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "@/redux/slice/productSlice";
import Loader from "../loader/Loader";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

import styles from "./Product.module.scss";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
