import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";

const ReceiptScanner = ({ onCameraActiveChange }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [pictureUri, setPictureUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handlePressScanReceipt = () => {
    setIsCameraActive(true);
    onCameraActiveChange && onCameraActiveChange(true);
    setPictureUri(null);
  };

  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    const options = { quality: 0.5, base64: true };
    const photo = await cameraRef.current.takePictureAsync(options);
    setPictureUri(photo.uri);
  };

  const handleAcceptPicture = () => {
    console.log("Picture accepted:", pictureUri);
    setIsCameraActive(false);
    onCameraActiveChange && onCameraActiveChange(false);
    setPictureUri(null);
  };

  const handleRetakePicture = () => {
    setPictureUri(null);
  };

  const handleCancelCamera = () => {
    setIsCameraActive(false);
    onCameraActiveChange && onCameraActiveChange(false);
    setPictureUri(null);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={handlePressScanReceipt}
      >
        <Text style={styles.scanButtonText}>Scan Receipt</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isCameraActive}
        onRequestClose={handleCancelCamera}
      >
        {pictureUri ? (
          <>
            <Image
              source={{ uri: pictureUri }}
              style={styles.fullScreen}
              resizeMode="contain"
            />
            <View style={styles.buttonContainer}>
              <Button title="Accept" onPress={handleAcceptPicture} />
              <Button title="Retake" onPress={handleRetakePicture} />
              <Button
                title="Cancel"
                onPress={handleCancelCamera}
                color="#FF0000"
              />
            </View>
          </>
        ) : (
          <>
            <Camera
              style={styles.fullScreen}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
            />
            <View style={styles.buttonContainer}>
              <Button title="Take Picture" onPress={handleTakePicture} />
              <Button
                title="Cancel"
                onPress={handleCancelCamera}
                color="#FF0000"
              />
            </View>
          </>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  scanButton: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReceiptScanner;
