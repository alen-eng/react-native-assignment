
import { TailwindProvider } from 'tailwind-rn';
import  { Provider }   from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import  { createNativeStackNavigator }  from "@react-navigation/native-stack";
import Page1Screen from './screens/Page1';
import Page2Screen from './screens/Page2';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <TailwindProvider>
      <Stack.Navigator>

      <Stack.Screen name="Page1" component={Page1Screen} options={{presentation: "modal" , headerShown: false }} />
      <Stack.Screen name="Page2" component={Page2Screen} options={{presentation: "modal" , headerShown: false }}  />
      </Stack.Navigator>
  </TailwindProvider>
  </NavigationContainer>
  );
}

