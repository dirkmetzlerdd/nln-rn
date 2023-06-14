import { ScrollView, View } from "react-native";
import AddServiceStepOne from "../components/addServiceStepOne";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddService() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <AddServiceStepOne />
      </ScrollView>
    </SafeAreaView>
  );
}
