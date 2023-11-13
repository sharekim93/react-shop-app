"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import InnerHeader from "../innerHeader/InnerHeader";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectIsLoggedIn,
} from "@/redux/slice/authSlice";

const Header = () => {
  const pathName = usePathname();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [displayName, setDisplayName] = React.useState("");

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);

      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        // 유저 정보를 리덕스 스토어에 저장하기
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        // 유저 정보를 리덕스 스토어에서 지우기
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const router = useRouter();

  const logoutUser = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        toast.success("로그아웃 되었습니다.");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  if (
    pathName === "/login" ||
    pathName === "/register" ||
    pathName === "/reset"
  )
    return null;

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          {!isLoggedIn ? (
            <li className={styles.item}>
              <Link href={"/login"}>로그인</Link>
            </li>
          ) : (
            <>
              <li className={styles.item}>
                <Link href={"/admin/dashboard"}>관리자</Link>
              </li>
              <li className={styles.item}>
                <Link href={"/order-history"}>주문 목록</Link>
              </li>
              <li className={styles.item}>
                <Link href={"/"} onClick={logoutUser}>
                  로그아웃
                </Link>
              </li>
              <li className={styles.item}>
                <Link href={"/"}>제휴 마케팅</Link>
              </li>
              <li className={styles.item}>
                <Link href={"/"}>쿠팡 플레이</Link>
              </li>
              <li className={styles.item}>
                <Link href={"/"}>고객센터</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {pathName.startsWith("/admin") ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
