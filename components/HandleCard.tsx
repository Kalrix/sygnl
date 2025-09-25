import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";

type Props = {
  handle: string;
  onChangeHandle: (v: string) => void;
  onSecure: () => void;
};

const normalize = (v: string) =>
  v.replace(/^\/+/, "").replace(/[^\w.]/g, "").toLowerCase();

const isValidHandle = (v: string) => normalize(v).length >= 3;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HandleCard: React.FC<Props> = ({ handle, onChangeHandle, onSecure }) => {
  const [count, setCount] = useState(12098);
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);

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

  const hNorm = normalize(handle);
  const validHandle = isValidHandle(hNorm);
  const validEmail = emailRegex.test(email.trim());
  const canSecure = validHandle && validEmail;

  const onPressSecure = () => {
    if (!validHandle) {
      Alert.alert("Handle too short", "Use at least 3 characters.");
      return;
    }
    if (!validEmail) {
      setShowEmail(true);
      Alert.alert("Email required", "Enter a valid email to secure your handle.");
      return;
    }
    onSecure();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your handle. Your identity. Secure it now.</Text>

      {/* Handle */}
      <View style={[styles.inputRow, validHandle && styles.inputActive]}>
        <Text style={styles.prefix}>sygnl.in/</Text>
        <TextInput
          value={handle}
          onChangeText={(v) => onChangeHandle(normalize(v))}
          placeholder="yourname"
          placeholderTextColor="#666"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
          onFocus={() => setShowEmail(true)}
        />
      </View>

      {/* Email */}
      {showEmail && (
        <View style={[styles.inputRow, validEmail && styles.inputActive]}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email@domain.com"
            placeholderTextColor="#666"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            maxLength={64}
          />
        </View>
      )}

      {/* CTA */}
      <Pressable
        onPress={onPressSecure}
        style={[styles.button, !canSecure && styles.buttonDisabled]}
        disabled={!canSecure}
      >
        <Text style={styles.buttonText}>
          {canSecure ? `Secure sygnl.in/${hNorm}` : "Secure your handle"}
        </Text>
      </Pressable>

      <Text style={styles.counter}>
        {prettyCount}+ handles secured — join now
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 540,
    padding: 28,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.02)", // translucent
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
  inputActive: {
    borderColor: "#00ffff",
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
