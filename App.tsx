import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';

import CenteredScreen from './components/CenteredScreen';
import Logo from './components/Logo';
import Tagline from './components/Tagline';
import HandleCard from './components/HandleCard';
import SecuredCard from './components/SecuredCard';
import Footer from './components/Footer';
import { normalizeHandle, isHandleValid } from './utils/handle';

// Web-only background rays (noop on native)
const LightRaysWeb: React.ComponentType<any> =
  Platform.OS === 'web' ? require('./components/LightRays').default : () => null;

export default function App() {
  const [handle, setHandle] = useState('');
  const [secured, setSecured] = useState<string | null>(null);

  const disabled = useMemo(() => !isHandleValid(handle), [handle]);
  const onChangeHandle = (v: string) => setHandle(normalizeHandle(v));

  const onSecure = () => {
    if (disabled) {
      Alert.alert('Handle too short', 'Use at least 3 characters.');
      return;
    }
    setSecured(handle);
    Alert.alert(
      'Handle secured 🎉',
      `@${handle} is now yours on sygnl.in.\nOnly one @handle exists — you just claimed it.`
    );
  };

  const onReset = () => {
    setHandle('');
    setSecured(null);
  };

  return (
    <CenteredScreen>
      {/* Background (web only) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LightRaysWeb
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.06}
          distortion={0.04}
        />
      </View>

      {/* Foreground */}
      <View style={styles.centerContent}>
        <Logo />
        <Tagline />

        {secured ? (
          <SecuredCard secured={secured} onReset={onReset} />
        ) : (
          <HandleCard
            handle={handle}
            onChangeHandle={onChangeHandle}
            onSecure={onSecure}
            disabled={disabled}
          />
        )}
      </View>

      <Footer />
      <StatusBar style="light" />
    </CenteredScreen>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    gap: 32,
    width: '100%',
    maxWidth: 720,
  },
});
