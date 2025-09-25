import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

type Props = {
  handle: string;
  email: string;
  onChangeHandle: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onSecure: () => void;   // App.tsx handles DB + sets `secured`
  disabled?: boolean;     // App.tsx decides when the CTA is enabled
};

const HandleCard: React.FC<Props> = ({
  handle,
  email,
  onChangeHandle,
  onChangeEmail,
  onSecure,
  disabled = false,
}) => {
  // FOMO counter (pure UI)
  const [count, setCount] = useState(12098);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const tick = () => {
      if (!mountedRef.current) return;
      setCount((prev) => prev + (1 + Math.floor(Math.random() * 3)));
      const nextIn = 2500 + Math.floor(Math.random() * 2000);
      timerRef.current = setTimeout(tick, nextIn);
    };
    timerRef.current = setTimeout(tick, 2000);
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const prettyCount = useMemo(() => count.toLocaleString(), [count]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your handle. Your identity. Secure it now.</Text>

      {/* Handle */}
      <View style={styles.inputRow}>
        <Text style={styles.prefix}>sygnl.in/</Text>
        <TextInput
          value={handle}
          onChangeText={onChangeHandle}
          placeholder="yourname"
          placeholderTextColor="#666"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
        />
      </View>

      {/* Email */}
      <View style={styles.inputRow}>
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          placeholder="email@domain.com"
          placeholderTextColor="#666"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          maxLength={64}
        />
      </View>

      {/* CTA */}
      <Pressable
        onPress={onSecure}
        style={[styles.button, disabled && styles.buttonDisabled]}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>
          {disabled ? "Secure your handle" : `Secure sygnl.in/${handle || ""}`}
        </Text>
      </Pressable>

      <Text style={styles.counter}>{prettyCount}+ handles secured — join now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 540,
    padding: 28,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    gap: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 52,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  prefix: {
    fontSize: 16,
    color: "#aaa",
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingVertical: 10,
  },
  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  counter: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    marginTop: 4,
  },
});

export default HandleCard;
