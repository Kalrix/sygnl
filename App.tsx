import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Alert, Platform, StyleSheet, View, Text } from 'react-native';

import CenteredScreen from './components/CenteredScreen';
import Logo from './components/Logo';
import Tagline from './components/Tagline';
import HandleCard from './components/HandleCard';
import SecuredCard from './components/SecuredCard';
import Footer from './components/Footer';

import {
  normalizeHandle,
  isHandleValid,
  isHandleAvailable,
  reserveHandle,
} from './utils/handle';

// Web-only background rays (noop on native)
const LightRaysWeb: React.ComponentType<any> =
  Platform.OS === 'web' ? require('./components/LightRays').default : () => null;

export default function App() {
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [secured, setSecured] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const disabled = useMemo(
    () =>
      !isHandleValid(handle) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      busy,
    [handle, email, busy]
  );

  const onChangeHandle = (v: string) => {
    setHandle(normalizeHandle(v));
    if (errorMsg) setErrorMsg(null);
  };
  const onChangeEmail = (v: string) => {
    setEmail(v);
    if (errorMsg) setErrorMsg(null);
  };

  const onSecure = async () => {
    setErrorMsg(null);

    if (!isHandleValid(handle)) {
      setErrorMsg('Handle too short — use at least 3 characters.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Enter a valid email to secure your handle.');
      return;
    }

    try {
      setBusy(true);

      // 1) availability check
      const available = await isHandleAvailable(handle);
      if (!available) {
        setErrorMsg('This handle is already secured by someone else.');
        return;
      }

      // 2) reserve in Supabase
      const res = await reserveHandle({ email, handle });
      if (!res.ok) {
        setErrorMsg(
          res.reason === 'taken'
            ? 'This handle is already secured.'
            : 'Server error — please try again.'
        );
        return;
      }

      // 3) success → go to SecuredCard
      setSecured(res.handle);
      Alert.alert('Handle secured 🎉', `sygnl.in/${res.handle} is now yours.`);
    } catch (e) {
      console.error(e);
      setErrorMsg('Something went wrong — please try again.');
    } finally {
      setBusy(false);
    }
  };

  const onReset = () => {
    setHandle('');
    setEmail('');
    setSecured(null);
    setErrorMsg(null);
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
          // ✅ Pass the correct prop name expected by SecuredCard
          <SecuredCard handle={secured} onReset={onReset} />
        ) : (
          <>
            {/* Inline error banner */}
            {errorMsg ? (
              <View style={styles.errorBar}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            <HandleCard
              handle={handle}
              email={email}                 // HandleCard stays controlled
              onChangeHandle={onChangeHandle}
              onChangeEmail={onChangeEmail}
              onSecure={onSecure}
              disabled={disabled}
            />
          </>
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
    gap: 24,
    width: '100%',
    maxWidth: 720,
  },
  errorBar: {
    width: '100%',
    maxWidth: 540,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 77, 79, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 79, 0.35)',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 13.5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
