import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UsersList from "./screens/UsersList";
import CreateUser from "./screens/CreateUser";
import UserDetail from "./screens/UserDetail";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="UsersList">
      <Stack.Screen
        name="UsersList"
        component={UsersList}
        options={{ title: "User List" }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{ title: "Create a New user" }}
      />
      <Stack.Screen
        name="UserDetail"
        options={{ title: "User Detail" }}
        component={UserDetail}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
