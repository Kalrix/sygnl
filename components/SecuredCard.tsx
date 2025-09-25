import React, { useMemo, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";

type Props = {
  handle: string;
  claimedCount?: number;
  cap?: number;
  onReset?: () => void; // optional
};

const SITE = "https://sygnl.in"; // <-- change to https://syngl.in if that's your domain
const buildShareUrl = (h: string) =>
  `${SITE}/share/${encodeURIComponent(h)}?ref=${encodeURIComponent(h)}&utm_source=app&utm_campaign=share_card`;

const SecureCard: React.FC<Props> = ({ handle, claimedCount = 21420, cap = 50000, onReset }) => {
  const h = (handle || "").trim().toLowerCase();
  const shareUrl = useMemo(() => buildShareUrl(h), [h]);

  const progress = Math.max(0, Math.min(1, claimedCount / cap));
  const progressPct = Math.round(progress * 100);

  const [copied, setCopied] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const copyLink = async () => {
    await Clipboard.setStringAsync(shareUrl);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    toastOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(toastOpacity, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
    ]).start(() => setCopied(false));
  }, [copied, toastOpacity]);

  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={["#00ffff40", "#7d5fff40", "#ff7dd640"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aura}
      >
        <View style={styles.card}>
          {/* ✅ Congratulations line */}
          <Text style={styles.congrats}>🎉 Congratulations! You secured your name</Text>

          {/* ✅ This will now show your URL correctly */}
          <Text style={styles.headline}>{SITE.replace(/^https?:\/\//, "")}/{h}</Text>

          <Text style={styles.sub}>
            Bharat’s social platform. Every voice matters. Every creation pays.
          </Text>

          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>
              First {cap.toLocaleString()} get 1 year free premium
            </Text>
          </View>

          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.max(8, progress * 100)}%` }]} />
            </View>
            <Text style={styles.progressLabel}>
              {claimedCount.toLocaleString()} / {cap.toLocaleString()} claimed · {progressPct}%
            </Text>
          </View>

          <Pressable onPress={copyLink} style={styles.cta}>
            <Text style={styles.ctaText}>Copy your share link</Text>
          </Pressable>

          <Text style={styles.miniLink} numberOfLines={1} ellipsizeMode="middle">
            {shareUrl}
          </Text>

          <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
            <Text style={styles.toastText}>Link copied</Text>
          </Animated.View>

          {onReset && (
            <Pressable onPress={onReset} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Secure another handle</Text>
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: "center", width: "100%", marginTop: 28, paddingHorizontal: 12 },
  aura: { width: "100%", maxWidth: 680, padding: 2, borderRadius: 28 },
  card: {
    borderRadius: 26,
    paddingVertical: 26,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    gap: 14,
  },
  congrats: { fontSize: 16, fontWeight: "700", color: "#00ffff", textAlign: "center", marginBottom: 6 },
  headline: { fontSize: 30, fontWeight: "900", color: "#fff", letterSpacing: 0.5, textAlign: "center" },
  sub: { fontSize: 14, color: "#cfcfcf", textAlign: "center", lineHeight: 20, maxWidth: 560, marginTop: 4 },
  ribbon: {
    marginTop: 6, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999,
    backgroundColor: "rgba(255,215,0,0.10)", borderWidth: 1, borderColor: "rgba(255,215,0,0.35)",
  },
  ribbonText: { fontSize: 12.5, fontWeight: "800", color: "#ffd700", letterSpacing: 0.3 },
  progressWrap: { width: "100%", maxWidth: 560, marginTop: 6, alignItems: "center", gap: 8 },
  progressTrack: { width: "100%", height: 8, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 999, backgroundColor: "#00ffff" },
  progressLabel: { fontSize: 12, color: "#9a9a9a" },
  cta: {
    marginTop: 10, height: 52, paddingHorizontal: 22, borderRadius: 999,
    backgroundColor: "#00ffff", alignItems: "center", justifyContent: "center",
  },
  ctaText: { color: "#000", fontWeight: "900", fontSize: 16, letterSpacing: 0.2 },
  miniLink: { fontSize: 11, color: "#7b7b7b", marginTop: 6, maxWidth: 580 },
  toast: {
    position: "absolute", bottom: 14, paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, backgroundColor: "rgba(0,0,0,0.65)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  toastText: { color: "#eaeaea", fontSize: 12, fontWeight: "700" },
  secondaryBtn: {
    marginTop: 10, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999,
    borderColor: "rgba(255,255,255,0.18)", borderWidth: 1, backgroundColor: "rgba(255,255,255,0.05)",
  },
  secondaryBtnText: { color: "#eaeaea", fontWeight: "700", fontSize: 13 },
});

export default SecureCard;
