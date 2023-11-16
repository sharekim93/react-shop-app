"use client";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";

const useFetchDocuments = (collectionName, arg) => {
  const [document, setDocument] = useState([]);
  const getDocuments = useCallback(async () => {
    const q = query(
      collection(db, collectionName),
      where(arg[0], arg[1], arg[2])
    );
    const querySnapshot = await getDocs(q);
    let documentsArray = [];

    querySnapshot.forEach((doc) => {
      documentsArray.push(doc.data());
    });

    setDocument(documentsArray);
  }, [collectionName, arg[0], arg[1], arg[2]]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  return document;
};

export default useFetchDocuments;
