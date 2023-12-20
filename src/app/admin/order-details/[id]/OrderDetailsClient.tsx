"use client";

import ChangeOrderStatus from "@/components/changeOrderStatus/ChangeOrderStatus";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import useFetchDocument from "@/hooks/useFetchDocument";
import { ICartItem, IOrder } from "@/types";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import styles from "./OrderDetails.module.scss";

const OrderDetailsClient = () => {
  const { id }: { id: string } = useParams();
  const { document: order } = useFetchDocument("orders", id);

  return (
    <section className={styles.table}>
      <Heading title="주문 상세 정보" />
      {order === null ? (
        <Loader />
      ) : (
        <>
          <div className={styles.details}>
            <p>
              <b>주문 아이디</b>
              {order.id}
            </p>
            <p>
              <b>주문 가격</b>
              {order.orderAmount}
            </p>
            <p>
              <b>주문 상태</b>
              {order.orderStatus}
            </p>
            <p>
              <b>배송 주소</b>
              {order.shippingAddress.line} {order.shippingAddress.city}
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cartItem: ICartItem, index: number) => {
                const { id, name, price, imageURL, cartQuantity } = cartItem;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>{cartQuantity}</td>
                    <td>{priceFormat(price * cartQuantity)}원</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ChangeOrderStatus order={order as IOrder} id={id} />
        </>
      )}
    </section>
  );
};

export default OrderDetailsClient;
