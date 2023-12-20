"use client";
import React from "react";

import { selectUserName } from "@/redux/slice/authSlice";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  const pathname = usePathname();
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              href="/admin/dashboard"
              className={
                pathname === "/admin/dashboard" ? `${styles.dashboard}` : ""
              }
            >
              대시보드
            </Link>
            <Link
              href="/admin/all-products"
              className={
                pathname === "/admin/dashboard" ? `${styles.dashboard}` : ""
              }
            >
              총 상품
            </Link>
            <Link
              href="/admin/add-product"
              className={
                pathname === "/admin/dashboard" ? `${styles.dashboard}` : ""
              }
            >
              상품 추가
            </Link>
            <Link
              href="/admin/orders"
              className={
                pathname === "/admin/dashboard" ? `${styles.dashboard}` : ""
              }
            >
              주문
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
