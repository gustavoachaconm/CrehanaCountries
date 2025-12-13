import React, { useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

interface CustomBackButtonProps {
  tintColor?: string;
  canGoBack?: boolean;
}

export const CustomBackButton: React.FC<CustomBackButtonProps> = ({ 
  tintColor = '#FFFFFF', 
  canGoBack = true 
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <TouchableOpacity
      disabled={!canGoBack}
      onPress={handleGoBack}
      activeOpacity={0.6}
      accessibilityRole="button"
      accessibilityLabel="Volver"
      className="px-3 py-1"
    >
      <Text style={{ color: tintColor }} className="text-xl font-bold">
        ←
      </Text>
    </TouchableOpacity>
  );
};