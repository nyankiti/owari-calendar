import { Text, View, TouchableOpacity } from "react-native";

type Props = {
  text: string;
  handlePress: () => void;
  isSelected: boolean;
};

export default function RadioButton({ text, handlePress, isSelected }: Props) {
  return (
    <TouchableOpacity className="flex flex-row mx-4" onPress={handlePress}>
      <Text>{text}</Text>
      <View
        className=" mx-1 w-5 h-5 rounded-full bg-gray-50 border-blue-600 items-center justify-center"
        style={{ borderWidth: 1 }}
      >
        {isSelected && <View className="w-3 h-3 rounded-full bg-blue-500" />}
      </View>
    </TouchableOpacity>
  );
}
