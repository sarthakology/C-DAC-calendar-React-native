import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase";
import uuid from "react-native-uuid"; // Import react-native-uuid

export const uploadFileToFirebase = async (imageUpload, setImgURL) => {
  if (!imageUpload) return;

  try {
    const imageRef = ref(storage, `images/${uuid.v4()}`); // Use react-native-uuid
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);

    setImgURL(url);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
