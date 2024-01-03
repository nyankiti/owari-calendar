import { Text, View, TextInput } from "react-native";

export default function OwariInput() {
  return (
    <View className="container px-4 md:px-6">
      <View className="flex flex-col items-center mt-6 gap-4 text-center">
        <Text
          role="heading"
          className="text-2xl font-bold self-start tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl"
        >
          何が終了する？
        </Text>
        <TextInput
          placeholder="学校生活, 現在の就職先、担当プロジェクトなどなど"
          className="w-full mx-32 rounded border bg-gray-100 p-2 focus:border-blue-500"
        />
      </View>
    </View>
  );
}
