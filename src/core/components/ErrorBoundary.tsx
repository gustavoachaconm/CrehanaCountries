import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 justify-center items-center bg-gray-50 px-6">
          <Text className="text-2xl font-bold text-red-600 mb-2">¡Ups!</Text>
          <Text className="text-base text-gray-700 text-center mb-4">
            Algo salió mal. Por favor, intenta de nuevo.
          </Text>
          {this.state.error && (
            <Text className="text-sm text-gray-500 text-center mb-6">
              {this.state.error.message}
            </Text>
          )}
          <TouchableOpacity
            className="bg-indigo-600 px-6 py-3 rounded-lg"
            onPress={this.handleReset}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
