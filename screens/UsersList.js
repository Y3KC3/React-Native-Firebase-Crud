import { useEffect, useState } from "react";
import { Button, ScrollView } from "react-native";
import { database } from "../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
import { collection, query, onSnapshot } from "firebase/firestore";

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onChange in firebase
      // getDocs is not onChange in firebase a unique value
      const users = [];
      querySnapshot.docs.map((doc) => {
        const data = doc.data();
        users.push({
          ...data,
          id: doc.id,
        });
      });
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => navigation.push("CreateUser")}
      />

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              navigation.push("UserDetail", { userId: user.id });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: "https://randomuser.me/api/portraits/men/36.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
