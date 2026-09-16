"use client";

import { useAuth } from "@/lib/auth";

export function FarmerWelcome() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <p className="small-caps text-gold-soft">
      Namaste, {user.name} · {user.crop} · {user.place}
    </p>
  );
}
