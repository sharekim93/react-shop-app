import React, { useState, useEffect } from "react";
import Pagination from "@/components/pagination/Pagination";
import {
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "@/redux/slice/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductList.module.scss";
import { IProduct } from "@/types";

interface IProductListProps {
  products?: IProduct[];
}

const ProductList = ({ products }: IProductListProps) => {
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(10);

  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const isRadioSelected = (value: string) => sort === "value";
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSort(e.target.value);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }));
  }, [dispatch, sort]);

  return (
    <div className={styles.productList}>
      <div className={styles.top}>
        <div>
          <ul className={styles.sort}>
            <li className={isRadioSelected("latest") ? styles.selected : null}>
              <input
                type="radio"
                value="latest"
                id="latest"
                checked={isRadioSelected("latest")}
                onChange={handleRadioClick}
              />
              <label htmlFor="latest">최신순</label>
            </li>
            <li
              className={
                isRadioSelected("lowest-price") ? styles.selected : null
              }
            >
              <input
                type="radio"
                value="lowest-price"
                id="lowest-price"
                checked={isRadioSelected("lowest-price")}
                onChange={handleRadioClick}
              />
              <label htmlFor="lowest-price">낮은 가격순</label>
            </li>
            <li
              className={
                isRadioSelected("highest-price") ? styles.selected : null
              }
            >
              <input
                type="radio"
                value="highest-price"
                id="highest-price"
                checked={isRadioSelected("highest-price")}
                onChange={handleRadioClick}
              />
              <label htmlFor="highest-price">높은 가격순</label>
            </li>
          </ul>
        </div>
        <div className={styles.limit}>
          <select
            value={productsPerPage}
            onChange={(e) => setProductPerPage(Number(e.target.value))}
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
          </select>
        </div>
      </div>
      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다</p>
        ) : (
          currentProducts.map((product) => {
            return (
              <div key={product.id}>
                <ProductItem {...product} />
              </div>
            );
          })
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};

export default ProductList;
