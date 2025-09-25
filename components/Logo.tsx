import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Logo = () => {
  return <Text style={styles.logo}>sygnl.in</Text>;
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: 6,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Logo;
