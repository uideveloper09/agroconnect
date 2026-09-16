import type { Metadata } from "next";
import { LoginView } from "@/components/LoginView";

export const metadata: Metadata = {
  title: "Login — Agro Connect",
  description: "Login with a dummy JSON account, then enter the Agro Connect journal.",
};

export default function LoginEntryPage() {
  return <LoginView />;
}
