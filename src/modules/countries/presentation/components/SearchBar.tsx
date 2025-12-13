import React, { useCallback } from 'react';
import { TextInput, View, Vibration, Platform } from 'react-native';
import { sanitizeLettersOnly, MAX_SEARCH_LENGTH } from '../../../../core/utils/textValidation';
import { strings } from '../../../../core/config/i18n';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = strings.countries.searchPlaceholder,
}) => {
  const handleTextChange = useCallback((text: string) => {
    const sanitized = sanitizeLettersOnly(text);
    
    if (text !== sanitized && Platform.OS === 'ios') {
      Vibration.vibrate(10);
    }
    
    onChangeText(sanitized);
  }, [onChangeText]);

  return (
    <View className="px-4 py-2">
      <TextInput
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={handleTextChange}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        maxLength={MAX_SEARCH_LENGTH}
      />
    </View>
  );
};
