"use client";

import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import useFetchCollection from "@/hooks/useFetchCollection";
import { selectOrderHistory, STORE_ORDERS } from "@/redux/slice/orderSlice";
import { IOrder } from "@/types";
import { formatTime } from "@/utils/dayjs";
import priceFormat from "@/utils/priceFormat";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Orders.module.scss";

const OrdersClient = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const router = useRouter();
  const orders = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id: string) => {
    router.push(`/admin/order-details/${id}`);
  };

  return (
    <div className={styles.order}>
      <Heading title="주문 내역" subtitle="주문 상태 변경" />
      <>
        {isLoading && <Loader basic />}
        <div className={styles.table}>
          {orders.length === 0 ? (
            <p>주문 목록이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <th>순서</th>
                <th>주문</th>
                <th>주문 아이디</th>
                <th>주문 금액</th>
                <th>주문 상태</th>
              </thead>
              <tbody>
                {orders.map((order: IOrder, index: number) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>{formatTime(orderDate)}</td>
                      <td>{id}</td>
                      <td>{priceFormat(orderAmount)}</td>
                      <td>
                        <p
                          className={
                            orderStatus !== "배송완료"
                              ? `${styles.pending}`
                              : `${styles.delievered}`
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </div>
  );
};

export default OrdersClient;
