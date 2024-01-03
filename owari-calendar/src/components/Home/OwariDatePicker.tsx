import { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type timeUnit = "day" | "week" | "month" | "year";
type OwariDateInputs = { [key in timeUnit]: string };

function getTomorrowDate(): Date {
  const result = new Date();
  result.setDate(result.getDate() + 1);
  return result;
}

function calculateDate(
  value: { [key in timeUnit]: string },
  unit: timeUnit
): Date {
  const result = new Date();

  result.setDate(result.getDate() + Number(value["day"])); // memo: Numberメソッドにおいて、文字列は0となる
  result.setDate(result.getDate() + Number(value["week"]) * 7);
  result.setMonth(result.getMonth() + Number(value["month"]));
  result.setFullYear(result.getFullYear() + Number(value["year"]));

  return result;
}

function calculateDiff(date1: Date, date2: Date): OwariDateInputs {
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1日のミリ秒数

  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  let remainingDays = Math.ceil(timeDiff / millisecondsPerDay); // 合計の日数の差

  const result = {
    day: "",
    week: "",
    month: "",
    year: "",
  };
  if (remainingDays >= 365) {
    // TODO: 閏年を考慮できていない
    result["year"] = String(Math.floor(remainingDays / 365));
    remainingDays %= 365;
  }

  if (remainingDays >= 30) {
    // TODO: 日数が違う月があることを考慮できていない
    result["month"] = String(Math.floor(remainingDays / 30));
    remainingDays %= 30;
  }

  if (remainingDays >= 7) {
    result["week"] = String(Math.floor(remainingDays / 7));
    remainingDays %= 7;
  }
  if (remainingDays > 0) {
    result["day"] = String(remainingDays);
  }
  return result;
}

export default function OwariDatePicker() {
  // TODO: dropdownでどれかだけを表示するUXにする。さらに選択した値を共通化する。
  const [owariDateInputs, setOwariDateInputs] = useState<OwariDateInputs>({
    day: "1",
    week: "",
    month: "",
    year: "",
  });
  const [owariDate, setOwariDate] = useState(getTomorrowDate());

  const handleNumberInputChange = (value: string, unit: timeUnit) => {
    // 自然数、もしくは値なしの場合のみ更新
    if (/^[0-9]+$/.test(value) || value === "") {
      const newDateNumbers = { ...owariDateInputs, [unit]: value };
      setOwariDateInputs(newDateNumbers);
      setOwariDate(calculateDate(newDateNumbers, unit));
    }
  };

  const handleDatePickerChange = (event: DateTimePickerEvent, date: Date) => {
    setOwariDate(date);
    setOwariDateInputs(calculateDiff(date, new Date()));
    // 差分を計算してinputの方に反映する
  };

  useEffect(() => {}, []);

  return (
    <View className="container px-4 md:px-6">
      <View className="flex flex-col items-center mt-6 gap-4 text-center">
        <Text className="text-2xl font-bold self-start tracking-tighter">
          終了する日を決める
        </Text>
        <View className="self-start px-2">
          <View className="p-2">
            <Text className="text-xl font-bold tracking-tighter">
              1. 日付から選択する
            </Text>
            <View className="flex flex-row">
              <DateTimePicker
                value={owariDate}
                onChange={handleDatePickerChange}
                mode="date"
                locale="ja_JP"
                minimumDate={new Date()}
              />
              <Text className="mx-2 self-center">後に終了する</Text>
            </View>
          </View>
          <View className="p-2">
            <Text className="text-xl font-bold tracking-tighter">
              2. ◯◯ 日後で選択する
            </Text>
            <View className="flex flex-row">
              <View className="rounded border bg-gray-100 p-1 focus:border-blue-500">
                <TextInput
                  onChangeText={(value) =>
                    handleNumberInputChange(value, "year")
                  }
                  value={owariDateInputs["year"]}
                  keyboardType="numeric"
                />
              </View>
              <Text className="p-1">年</Text>

              <View className="rounded border bg-gray-100 p-1 focus:border-blue-500">
                <TextInput
                  onChangeText={(value) =>
                    handleNumberInputChange(value, "month")
                  }
                  value={owariDateInputs["month"]}
                  keyboardType="numeric"
                />
              </View>
              <Text className="p-1">ヶ月</Text>

              <View className="rounded border bg-gray-100 p-1 focus:border-blue-500">
                <TextInput
                  onChangeText={(value) =>
                    handleNumberInputChange(value, "week")
                  }
                  value={owariDateInputs["week"]}
                  keyboardType="numeric"
                />
              </View>
              <Text className="p-1">週</Text>

              <View className="rounded border bg-gray-100 p-1 focus:border-blue-500">
                <TextInput
                  onChangeText={(value) =>
                    handleNumberInputChange(value, "day")
                  }
                  value={owariDateInputs["day"]}
                  keyboardType="numeric"
                />
              </View>
              <Text className="p-1">日</Text>

              <Text className="p-1">後に終了する</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
