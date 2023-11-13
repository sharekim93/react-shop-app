"use client";

import React from "react";
import Link from "next/link";

import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/Loader";

import styles from "./Reset.module.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";

const ResetClient = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("비밀번호 업데이트를 위해서 이메일을 확인해주세요");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Heading
              title="비밀번호 업데이트"
              subtitle="이메일 주소를 입력해주세요"
            />

            <form onSubmit={resetPassword}>
              <Input
                type="text"
                placeholder="Email"
                required
                value={email}
                className={styles.control}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Button type="submit">업데이트</Button>
              </div>

              <div className={styles.links}></div>
              <p>
                <Link href="/login">로그인</Link>
              </p>
              <p>
                <Link href="/register">회원가입</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetClient;
