import { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../database/firebase";

const CreateUser = ({ navigation }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const addUser = async () => {
    if (state.name === '') {
      Alert.alert('Please provide a name');
    } else {
      try {
        await addDoc(collection(database, 'users'), {
          name: state.name,
          email: state.email,
          phone: state.phone
        });
        navigation.pop();
      } catch (e) {
        console.log(e)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={state.name}
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={state.email}
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={state.phone}
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button title="Save User" onPress={() => addUser()} />
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

export default CreateUser;
