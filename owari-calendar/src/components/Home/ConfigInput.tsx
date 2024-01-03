import { useState } from "react";
import { Text, View } from "react-native";
/* components */
import RadioButton from "../common/RadioButton";

export default function ConfigInput() {
  const [isSelected, setIsSelected] = useState(true);
  return (
    <View className="container px-4 md:px-6">
      <View className="flex flex-row items-center mt-6 gap-4 text-center">
        <Text
          role="heading"
          className="text-2xl font-bold self-start tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl"
        >
          ホームに追加する？
        </Text>
        <View className="flex flex-row">
          <RadioButton
            text="はい"
            handlePress={() => setIsSelected(true)}
            isSelected={isSelected}
          />
          <RadioButton
            text="いいえ"
            handlePress={() => setIsSelected(false)}
            isSelected={!isSelected}
          />
        </View>
      </View>
      <Text>
        選択するとホーム画面にウィジェットとしてカウントダウンが表示されます。
      </Text>
    </View>
  );
}
