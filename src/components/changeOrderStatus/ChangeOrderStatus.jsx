import { db } from "@/firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../button/Button";
import Loader from "../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (e) => {
    e.preventDefault();
    const orderData = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderData);
      setIsLoading(false);
      toast.success("주문 상태가 변경되었습니다.");
      router.push("/admin/orders");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader basic />}
      <div className={styles.status}>
        <div className={styles.card}>
          <h4>주문 상태 업데이트</h4>
          <form onSubmit={(e) => editOrder(e)}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option disabled value="">
                -- 선택 --
              </option>
              <option value="주문수락">주문수락</option>
              <option value="주문처리중">주문처리중</option>
              <option value="주문중">주문중</option>
              <option value="주문완료">주문완료</option>
            </select>
            <div>
              <Button type="submit">업데이트</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
