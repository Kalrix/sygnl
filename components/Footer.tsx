import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.proud}>
        🇮🇳 Proudly Made in India. Built for the world.
      </Text>
      <Text style={styles.copy}>
        © 2025 sygnl.in — All rights reserved
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
  },
  proud: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  copy: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});

export default Footer;
