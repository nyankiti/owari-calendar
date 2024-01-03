import React from "react";
import { Text, View } from "react-native";
/* components */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OwariInput from "@/components/Home/OwariInput";
import OwariDatePicker from "@/components/Home/OwariDatePicker";
import ConfigInput from "@/components/Home/ConfigInput";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Header />
      <Content />
      <Footer />
    </View>
  );
}

function Content() {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="container px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              終わりカレンダー
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-600 dark:text-gray-400">
              有終の美を飾ろう。
            </Text>
          </View>
        </View>
        <OwariInput />
        <OwariDatePicker />
        <ConfigInput />
      </View>
    </View>
  );
}
