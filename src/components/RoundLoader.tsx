"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const spinRev = keyframes`
  to { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.9); opacity: 0.78; }
`;

const Wrap = styled.div<{ $size: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  position: relative;
  flex-shrink: 0;
  display: grid;
  place-items: center;
`;

const Track = styled.span<{ $onDark?: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px dashed ${(p) => (p.$onDark ? "rgba(255,255,255,0.28)" : "rgba(27, 94, 63, 0.18)")};
`;

const Ring = styled.span<{ $size: number; $rev?: boolean; $inset: number; $onDark?: boolean }>`
  position: absolute;
  inset: ${(p) => p.$inset}px;
  border-radius: 50%;
  border: ${(p) => Math.max(2.5, p.$size / 18)}px solid transparent;
  border-top-color: ${(p) =>
    p.$rev ? (p.$onDark ? "#e8c96a" : "#c9a227") : p.$onDark ? "#fff" : "#3d9b5c"};
  border-right-color: ${(p) =>
    p.$rev ? (p.$onDark ? "rgba(232,201,106,0.55)" : "#e8c96a") : "transparent"};
  animation: ${(p) => (p.$rev ? spinRev : spin)} ${(p) => (p.$rev ? 1.15 : 0.8)}s linear infinite;
`;

const Core = styled.span<{ $size: number }>`
  width: ${(p) => p.$size * 0.42}px;
  height: ${(p) => p.$size * 0.42}px;
  border-radius: 50%;
  background: linear-gradient(155deg, #4caf6d, #1b5e3f);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 20px -8px rgba(27, 94, 63, 0.7);
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  background: rgba(12, 47, 36, 0.48);
  backdrop-filter: blur(12px);
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: min(320px, calc(100vw - 32px));
  padding: 28px 20px;
  border-radius: 24px;
  background: rgba(255, 252, 247, 0.96);
  box-shadow: 0 24px 60px -24px rgba(15, 61, 46, 0.55);
  text-align: center;

  @media (min-width: 640px) {
    padding: 36px 42px;
    border-radius: 28px;
  }
`;

export function RoundLoader({
  size = 88,
  label,
  overlay = false,
  onDark = false,
}: {
  size?: number;
  label?: string;
  overlay?: boolean;
  onDark?: boolean;
}) {
  const compact = size < 40;
  const loader = (
    <Wrap $size={size} role="status" aria-label={label || "Loading"}>
      {!compact && <Track $onDark={onDark} />}
      <Ring $size={size} $inset={0} $onDark={onDark} />
      {!compact && <Ring $size={size} $rev $inset={Math.round(size * 0.14)} $onDark={onDark} />}
      {!compact && (
        <Core $size={size}>
          <svg width={size * 0.2} height={size * 0.2} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 21c0-6 7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 7 7 13Z"
              fill="currentColor"
            />
            <path d="M12 21V9" stroke="#E8C96A" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Core>
      )}
    </Wrap>
  );

  if (!overlay) {
    if (!label) return loader;
    return (
      <div className="flex flex-col items-center gap-4">
        {loader}
        <p className={`text-[14px] font-semibold ${onDark ? "text-white/85" : "text-sage"}`}>
          {label}
        </p>
      </div>
    );
  }

  return (
    <Overlay>
      <Panel>
        {loader}
        {label && <p className="text-[15px] font-semibold text-forest">{label}</p>}
      </Panel>
    </Overlay>
  );
}
