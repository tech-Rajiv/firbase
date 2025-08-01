import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firbase";
import { useDispatch, useSelector } from "react-redux";
import { setTweetLoading, setTweets } from "../features/tweetSlice";

export default function useTweetAPI() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dbcalled");
    dispatch(setTweetLoading(true));

    const q = query(collection(db, "feed"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tweets = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      dispatch(setTweets(tweets));
      dispatch(setTweetLoading(false));
    });

    return () => unsubscribe(); 
  }, []);

  return {
    
  };
}
