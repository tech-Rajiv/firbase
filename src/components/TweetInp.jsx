import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firbase";
import useUserDetails from "../hooks/useUserDetailsUpdate";
import { useSelector } from "react-redux";

function TweetInp() {
  const [input, setInput] = useState("");
  const [loading , setLoading] = useState(false)
  const [postImage, setPostImage] = useState({
    image: undefined,
    url: undefined,
  });
  const [showMsg, setShowMsg] = useState("");
  const { uploadToCloudinary, profilePhoto } = useUserDetails();
  const user = useSelector(state => state.auth.user)

  function resetMsg(){
    setTimeout(() => {
      setShowMsg()
    }, (3000));

  }
  async function addTweet() {
    if (!input) {
      setShowMsg("please add valid tweet")
      resetMsg()
      return;
    }
    setLoading(true)
    try {
      const gotPostCloudinaryUrl = await uploadToCloudinary(postImage.image);
     // console.log(gotPostCloudinaryUrl);
      const querySnapshot = await addDoc(collection(db, "feed"), {
        author: user.email,
        tweet: input,
        createdAt: Date.now(),
        authorPhoto: user.photoURL,
        tweetImage: gotPostCloudinaryUrl,
        comments:[],
        likes:[]
      });
      console.log('created user',querySnapshot);
      setShowMsg("tweet added Successfully.");
      resetMsg()
    } catch (error) {
      setShowMsg("something went wrong.");
      console.log(error);
    }
    setLoading(false)
    setInput("");
    setPostImage({
      image:undefined,
      url:undefined
    })
  }

  function postImageAdded(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPostImage((prev) => ({ ...prev, image: file }));
    setPostImage((prev) => ({ ...prev, url: url }));
  }
  return (
    <div className="w-full py-5 ">
      <div className="inp flex flex-col sm:gap-2 gap-2 justify-center">
        <div className="postImage border border-dotted p-2 flex justify-center items-center rounded-lg">
          <label htmlFor="addImage" className="overflow-hidden max-h-50  text-center rounded-lg cursor-pointer">
            {postImage.url ? (
              <img
                src={postImage.url}
                className="object-cover  sm:max-w-50"
                alt="image"
              />
            ) : (
              "+ Add Photo"
            )}
            <input
              type="file"
              className="hidden"
              id="addImage"
              onChange={postImageAdded}
            />
          </label>
        </div>
        <div className="text flex gap-4">
          {/* <textarea name="" id="" className="w-full max-h-50 border rounded-lg p-2 scroll-auto" placeholder="type ur tweet">
           
          </textarea> */}
          <input
            type="text"
            placeholder="make a tweet..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border py-2 px-2 rounded-lg w-full"
          />
          {
            loading ? <button
            
            className="bg-black text-white px-4  py-2 rounded-lg cursor-pointer"
          >
            posting...{" "}
          </button> : <button
            onClick={addTweet}
            className="bg-black text-white px-4  py-2 rounded-lg cursor-pointer"
          >
            tweet{" "}
          </button>
          }
          
        </div>
      </div>
      {showMsg && <p className="text-sm leading-relaxed mt-2">{showMsg}</p>}
    </div>
  );
}

export default TweetInp;
