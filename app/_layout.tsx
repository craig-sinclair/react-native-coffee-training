import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams to access params

export default function RootLayout() {
  const { drinkName } = useLocalSearchParams(); 

  return (
    <Stack>

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="drinks"
        options={{
          
          title: drinkName ? String(drinkName) : "Drink Details",
          headerShown: true, 
          headerBackTitle: 'Home',
        }}
      />
    </Stack>
  );
}
