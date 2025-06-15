
import React from "react";

export default function Logo({ size = 38 }: { size?: number }) {
  // size default matches previous styling (h-9 w-9 ~ 36px)
  return (
    <span
      className="rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 text-white inline-flex items-center justify-center"
      style={{ fontSize: size * 0.6, width: size, height: size, minWidth: size, minHeight: size }}
      aria-label="VoiceAble Logo"
    >
      🗣️
    </span>
  );
}
