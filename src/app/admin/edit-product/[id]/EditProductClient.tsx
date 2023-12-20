"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import useFetchDocument from "@/hooks/useFetchDocument";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { categories } from "../../add-product/AddProductClient";
import styles from "../../add-product/AddProduct.module.scss";
import getErrorMessage from "@/utils/getErrorMessage";

const EditProductClient = () => {
  const { id }: { id: string } = useParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { document } = useFetchDocument("products", id);
  const [product, setProduct] = useState(document);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (err) => {
        toast.error(getErrorMessage(err));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("이미지를 성공적으로 업로드 했습니다.");
        });
      }
    );
  };

  const editProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!product || !document) return;

    if (product.imageURL !== document.imageURL) {
      const storageRef = ref(storage, document.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: document.createdAt,
        editedAt: Timestamp.now(),
      });

      setIsLoading(false);

      toast.success("상품을 성공적으로 수정헀습니다.");
      router.push("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <Heading title="상품 수정하기" />
      <div className={styles.product}>
        {product === null ? (
          <Loader />
        ) : (
          <form onSubmit={editProduct}>
            <label>상품이름</label>
            <input
              type="text"
              placeholder="상품 이름"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <div>
              {uploadProgress === 0 ? null : (
                <div>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading...${uploadProgress}`
                      : `Upload Complete ${uploadProgress}`}
                  </div>
                </div>
              )}

              <input
                type="file"
                placeholder="상품 이미지"
                accept="image/*"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  name="imageURL"
                  disabled
                  value={product.imageURL}
                  required
                  placeholder="이미지 URL"
                />
              )}
            </div>
            <label>상품 가격</label>
            <input
              type="number"
              placeholder="상품 가격"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>상품 카테고리</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                상품 카테고리 선택
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <label>상품 브랜드 / 회사</label>
            <input
              type="text"
              placeholder="상품 브랜드/회사"
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>상품 설명:</label>
            <textarea
              name="desc"
              value={product.desc}
              cols={10}
              rows={10}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <Button type="submit">상품 수정</Button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditProductClient;
