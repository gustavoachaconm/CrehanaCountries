import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterPickerProps {
  label: string;
  selectedValue: string | null;
  options: FilterOption[];
  onSelect: (value: string | null) => void;
}

export const FilterPicker: React.FC<FilterPickerProps> = ({
  label,
  selectedValue,
  options,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleSelect = (value: string | null) => {
    onSelect(value);
    setIsVisible(false);
  };

  const displayValue = selectedValue
    ? options.find((opt) => opt.value === selectedValue)?.label
    : 'Todos';

  return (
    <View className="flex-1 mx-2">
      <Text className="text-sm text-gray-600 mb-1">{label}</Text>
      <View className="bg-white border border-gray-300 rounded-lg">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="flex-1 px-3 py-2"
            onPress={() => setIsVisible(true)}
            activeOpacity={0.7}
          >
            <Text className="text-base text-gray-900">{displayValue}</Text>
          </TouchableOpacity>
          {selectedValue && (
            <TouchableOpacity
              className="px-3 py-2"
              onPress={() => onSelect(null)}
              activeOpacity={0.6}
              accessibilityRole="button"
              accessibilityLabel={`Clear ${label} filter`}
            >
              <Text className="text-gray-500 text-lg">×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View className="bg-white rounded-lg w-4/5 max-h-96">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold">{label}</Text>
            </View>
            <ScrollView className="max-h-80">
              <TouchableOpacity
                className="p-4 border-b border-gray-100"
                onPress={() => handleSelect(null)}
              >
                <Text className="text-base text-gray-900 font-medium">Todos</Text>
              </TouchableOpacity>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className="p-4 border-b border-gray-100"
                  onPress={() => handleSelect(option.value)}
                >
                  <Text
                    className={`text-base ${
                      selectedValue === option.value
                        ? 'text-blue-600 font-bold'
                        : 'text-gray-900'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
