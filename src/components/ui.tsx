"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

const btnBase = css<{ $block?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${(p) => (p.$block ? "100%" : "auto")};
  max-width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.01em;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;
  cursor: pointer;
  border: 1.5px solid transparent;
  text-decoration: none;
  white-space: ${(p) => (p.$block ? "normal" : "nowrap")};
  text-align: center;
  box-sizing: border-box;

  @media (min-width: 640px) {
    padding: 14px 22px;
    font-size: 15px;
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
    opacity: 0.65;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(201, 162, 39, 0.45);
    outline-offset: 2px;
  }
`;

const variants = {
  primary: css`
    background: var(--canopy);
    color: #fff;
    box-shadow: var(--shadow-sm);
    &:hover:not(:disabled) {
      background: var(--forest);
    }
  `,
  gold: css`
    background: linear-gradient(180deg, #e0be5a, var(--gold));
    color: var(--forest);
    box-shadow: 0 10px 24px -12px rgba(201, 162, 39, 0.65);
  `,
  editorial: css`
    background: var(--gold);
    color: var(--forest);
    border-radius: 2px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 800;
    padding: 16px 26px;
    box-shadow: none;
  `,
  ink: css`
    background: transparent;
    color: inherit;
    border-radius: 0;
    border-color: transparent;
    border-bottom: 1px solid currentColor;
    padding: 6px 0;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    box-shadow: none;
    &:hover:not(:disabled) {
      transform: none;
      opacity: 0.72;
    }
  `,
  outline: css`
    background: #fff;
    color: var(--canopy);
    border-color: var(--line);
    &:hover:not(:disabled) {
      border-color: var(--fresh);
      background: var(--mist);
    }
  `,
  ghost: css`
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(8px);
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
    }
  `,
};

type Variant = keyof typeof variants;

export const Button = styled.button<{ $variant?: Variant; $block?: boolean }>`
  ${btnBase}
  ${(p) => variants[p.$variant ?? "primary"]}
`;

export const ButtonLink = styled(Link)<{ $variant?: Variant; $block?: boolean }>`
  ${btnBase}
  ${(p) => variants[p.$variant ?? "primary"]}
`;

export const Card = styled.div`
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
  min-width: 0;
  max-width: 100%;

  @media (min-width: 640px) {
    border-radius: 22px;
  }
`;

export const Field = styled.label`
  display: block;
  margin-bottom: 16px;

  span {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--sage);
    margin-bottom: 7px;
  }
`;

export const InputShell = styled.div<{ $error?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  input,
  select {
    width: 100%;
    min-width: 0;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1.5px solid ${(p) => (p.$error ? "var(--danger)" : "var(--line)")};
    background: ${(p) => (p.$error ? "var(--danger-bg)" : "#fff")};
    font-size: 16px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    font-family: inherit;
  }

  input:focus,
  select:focus {
    border-color: var(--fresh);
    box-shadow: 0 0 0 4px rgba(76, 175, 109, 0.14);
    background: #fff;
  }
`;

export const Prefix = styled.em`
  position: absolute;
  left: 16px;
  font-style: normal;
  font-weight: 700;
  color: var(--sage);
  font-size: 14px;
  pointer-events: none;
`;

export const ErrorText = styled.p`
  color: var(--danger);
  font-size: 12.5px;
  font-weight: 600;
  margin-top: 6px;
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
`;
