import { Camera, CameraType } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, Pressable, View } from "react-native";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>spiagl</Text>
      <StatusBar style="auto" />

      <Camera style={styles.camera} type={type}></Camera>

      <Pressable style={styles.button} onPress={toggleCameraType}>
        <Text style={styles.buttonText}>Flip Camera</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fc0",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 22,
    backgroundColor: "#000",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  camera: {
    height: 300,
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "700",
  },
});
