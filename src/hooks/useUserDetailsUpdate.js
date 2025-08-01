import { useEffect, useState } from "react";
import { auth } from "../firbase";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { useSelector } from "react-redux";
import useImage from "./useImage";



const {uploadToCloudinary} = useImage()

function useUserDetailsUpdate() {
const user = useSelector(state => state.auth.user)

  //to update profilePhoto
  async function updateUserProfilePhoto(file) {
    setLoading(true)
    const url = await uploadToCloudinary(file);
    if (!url) return;
    try {
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      console.log("Updated", auth.currentUser);
      setProfilePhoto(auth.currentUser.photoURL ?? "");
    } catch (err) {
      console.error("Error updating", err);
    }finally{
      setLoading(false);
    }
  }





  //to update profile name
  const updateProfileName = async (input) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: input,
      });

      console.log("Updated", auth.currentUser.displayName);
    } catch (err) {
      console.error("Error updating", err);
    }
  };
  return {
    updateUserProfilePhoto,
    uploadToCloudinary,
    updateProfileName,
  };
}

export default useUserDetailsUpdate;
