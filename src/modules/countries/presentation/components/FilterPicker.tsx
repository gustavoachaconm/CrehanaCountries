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
          className="flex-1 bg-black/50 justify-center items-center px-6"
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} className="w-full">
            <View className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <View style={{ backgroundColor: '#4b22f4' }} className="p-5">
                <Text className="text-xl font-bold text-white text-center">{label}</Text>
              </View>
              <ScrollView className="max-h-96">
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={option.value}
                    className={`p-4 ${index < options.length - 1 ? 'border-b border-gray-100' : ''}`}
                    onPress={() => handleSelect(option.value)}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`text-base text-center ${
                        selectedValue === option.value
                          ? 'text-indigo-600 font-bold'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
