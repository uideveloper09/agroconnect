"use client";

import { ThemeProvider } from "styled-components";
import { AuthProvider } from "@/lib/auth";
import { LanguageProvider } from "@/lib/i18n";
import StyledComponentsRegistry from "./registry";

const theme = {
  colors: {
    forest: "#0F3D2E",
    canopy: "#1B5E3F",
    gold: "#C9A227",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
