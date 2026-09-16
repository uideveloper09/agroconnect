"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { RoundLoader } from "./RoundLoader";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const { t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-dvh place-items-center bg-mist">
        <RoundLoader size={108} label={t("openingDesk")} />
      </div>
    );
  }

  return <>{children}</>;
}
