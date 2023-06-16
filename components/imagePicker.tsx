import React, { useState, Dispatch } from "react";
import { Image, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-paper";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initialize } from "../firebase/main";
import { useAuthContext } from "../context/authContext";
import uuid from "react-native-uuid";

const { storage } = initialize();

type ImageUploadProps = {
  setImgUrl: Dispatch<string>;
};

export default function ImagePickerComp({ setImgUrl }: ImageUploadProps) {
  const { colors } = useTheme();
  const { user } = useAuthContext();
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerResult | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please grant permission to access the photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
      uploadImage();
    }
  };

  const uploadImage = async () => {
    if (!selectedImage || !selectedImage.assets) return;

    const { uri } = selectedImage.assets[0];
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `/${user?.email}/${uuid.v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log(error);
        Alert.alert("Unexpected Error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      {selectedImage && selectedImage.assets ? (
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: selectedImage.assets[0].uri }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Icon
            size={100}
            icon="image"
            color={colors.primary}
            style={{ backgroundColor: colors.card }}
          />
        </TouchableOpacity>
      )}
      {selectedImage ? (
        <TouchableOpacity
          onPress={() => setSelectedImage(null)}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.text,
            ...styles.resetButton,
          }}
        >
          <Icon name="close" size={30} color={colors.text} />
        </TouchableOpacity>
      ) : null}
      <Button onPress={uploadImage}>GO</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  resetButton: {
    top: 0,
    right: 10,
    position: "absolute",
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
  },
});
