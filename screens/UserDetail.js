import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { database } from "../database/firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

const UserDetail = ({ route, navigation }) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const { userId } = route.params;

  const getUserById = async (id) => {
    const docRef = doc(database, "users", id);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();
    setUser({ ...user, id });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const docRef = doc(database, "users", userId);
    await deleteDoc(docRef);
    navigation.pop();
  };

  const updateUser = async () => {
    const docRef = doc(database, "users", userId);
    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    await updateDoc(docRef, data);
    setUser(initialState);
    navigation.pop();
  };

  const openConfirm = () => {
    Alert.alert("Remove the user", "Are you sure?", [
      { text: "No", onPress: () => console.log(false) },
      { text: "Yes", onPress: () => deleteUser() },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          title="Update User"
          color="#19AC52"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          title="Delete User"
          color="#E37399"
          onPress={() => openConfirm()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
});

export default UserDetail;
