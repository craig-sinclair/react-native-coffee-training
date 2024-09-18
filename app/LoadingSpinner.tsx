import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingSpinner = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null; // Return nothing if spinner should be hidden

  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
