import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const CenteredScreen: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

export default CenteredScreen;
