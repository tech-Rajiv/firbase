import React, { useEffect, useState } from "react";
import useUserDetails from "../hooks/useUserDetailsUpdate";
import useImage from "../hooks/useImage";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useSelector } from "react-redux";

function Settings({}) {
  //hooks call for getting user details
  const {
    nickName,
    email,
    profilePhoto,
    setNickName,
    updateUserProfilePhoto,
    updateProfileName,
    uploadToCloudinary,
    loading,
  } = useUserDetails();
  const user = useSelector(state => state.auth.user)

  //hook call for image realted features
  const { compressImage } = useImage();
  const [localName, setLocalName] = useState(nickName ?? "");
  const [imageSrc, setImageSrc] = useState(profilePhoto);
  const [localFile, setLocalFile] = useState();

  const addProfile = async (e) => {
    const file = e.target.files[0];
    setLocalFile(file);
    const src = URL.createObjectURL(file);
    setImageSrc(src);
    console.log("done ");
  };

  const submitChanges = async () => {
    if (localName !== nickName) {
      console.log("name chnage");
      if (!localName.trim()) {
        console.log("invalid inpt to change name");
      }
      const updading = await updateProfileName(localName);
      console.log("done update name");
    }
    if (imageSrc !== profilePhoto) {
      console.log("image chnage");
      console.log("locl", localFile);
      const compressed = await compressImage(localFile);
      console.log(compressed, "compress");
      const url = await updateUserProfilePhoto(compressed);
      return;
    }
    console.log("nochnage");
    return;
  };
  return (
    <div className="py-5">
      <h4 className="mb-5">Settings</h4>
      <div className="allSettings mt-5 flex flex-col gap-2 bg-gray-50 rounded-xl py-5 px-2">
        <div className="btns px-1 mb-4 flex gap-2 items-center ">
          <div className="relative cursor-pointer logo w-10 h-10 bg-gray-100 shadow rounded-full flex justify-center items-center overflow-hidden">
            {user.photoURL && (
              <img
                src={user.photoURL ? user.photoURL : ""}
                alt=""
                className="w-full h-full object-cover absolute top-0"
              />
            )}

            <input
              type="file"
              id="UpdateProfile"
              onChange={addProfile}
              className="opacity-0"
            />
          </div>
          <label htmlFor="UpdateProfile" className="cursor-pointer">
            Update new Profile Picture
          </label>
        </div>
        <div className="name  flex gap-5 items-center">
          <input
            type="text"
            value={user.displayName}
            placeholder=""
            id="nameChange"
            onChange={(e) => setLocalName(e.target.value)}
            className="border py-1 px-2 rounded-lg"
          />
          <label htmlFor="nameChange">Change Name</label>
        </div>
      </div>
      <div className="btn mt-5">
        {loading ? (
          <button className="bg-black text-white px-4  py-2 rounded-lg cursor-pointer">
            saving...
          </button>
        ) : (
          <button
            className="bg-black text-white px-4  py-2 rounded-lg cursor-pointer"
            onClick={submitChanges}
          >
            save
          </button>
        )}
      </div>
    </div>
  );
}

export default Settings;
