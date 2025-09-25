import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";

const LINES = [
  "Your voice. Your space. Your sygnl.",
  "Every creation counts. Every creation pays.",
  "Built for brands to build real communities.",
  "Proudly Made in India. Built for the world.",
];

const TYPE_SPEED_MIN = 60;   // each char ~60ms
const TYPE_SPEED_MAX = 95;   // random max
const HOLD_AFTER_LINE = 2200; // hold ~2.2s
const SWEEP_DURATION = 2800;  // underline moves slower


function randomBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

const Tagline: React.FC = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const full = LINES[lineIndex];

  // underline sweep (0 -> 1)
  const sweep = useSharedValue(0);
  // subtle “pop in” scale for each line start
  const scale = useSharedValue(0.98);

  // Cursor blink (simple interval)
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 450);
    return () => clearInterval(id);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let cancelled = false;
    setTyped("");
    scale.value = 0.98;
    scale.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) });

    const typeNext = (i: number) => {
      if (cancelled) return;
      if (i <= full.length) {
        setTyped(full.slice(0, i));
        const nextIn = randomBetween(TYPE_SPEED_MIN, TYPE_SPEED_MAX);
        setTimeout(() => typeNext(i + 1), nextIn);
      } else {
        // finished this line → hold, then go next
        setTimeout(() => {
          if (cancelled) return;
          setLineIndex((prev) => (prev + 1) % LINES.length);
        }, HOLD_AFTER_LINE);
      }
    };

    // start typing
    setTimeout(() => typeNext(1), 200);

    // start/loop underline sweep
    sweep.value = 0;
    sweep.value = withRepeat(withTiming(1, { duration: SWEEP_DURATION, easing: Easing.inOut(Easing.quad) }), -1, true);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex]);

  // Animated styles
  const containerAnimated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sweepAnimated = useAnimatedStyle(() => {
    // sweep from -20% to 120% (overshoot both ends)
    const translateX = -0.2 + 1.4 * sweep.value;
    return {
      transform: [{ translateX: translateX * 100 + "%" }],
    };
  });

  // Display text + blinking cursor
  const display = useMemo(() => typed, [typed]);

  return (
    <Animated.View
      key={lineIndex}
      entering={FadeInUp.duration(420)}
      exiting={FadeOutUp.duration(320)}
      style={[styles.wrap, containerAnimated]}
    >
      <View style={styles.lineWrap}>
        <Text style={styles.text}>
          {display}
          <Text style={[styles.cursor, { opacity: cursorVisible ? 1 : 0 }]}>|</Text>
        </Text>

        {/* underline rail */}
        <View style={styles.rail}>
          {/* gradient-like sweep bar (simulated with two shades) */}
          <Animated.View style={[styles.sweep, sweepAnimated]} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    minHeight: 56, // keeps layout stable during transitions
    width: "100%",
  },
  lineWrap: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 720,
    width: "100%",
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.2,
  },
  cursor: {
    color: "#7dd3fc", // soft cyan cursor
  },
  rail: {
    marginTop: 10,
    height: 2,
    width: "60%",
    maxWidth: 440,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    overflow: "hidden",
  },
  sweep: {
    height: "100%",
    width: "40%",
    backgroundColor: "rgba(125,211,252,0.75)", // cyan glow
    shadowColor: "#7dd3fc",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});

export default Tagline;
