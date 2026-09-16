"use client";

import { ClipboardEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Check, Eye, EyeOff, KeyRound, Presentation, Smartphone } from "lucide-react";
import { Button, ButtonLink, Field, InputShell, Prefix } from "./ui";
import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { RoundLoader } from "./RoundLoader";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./Reveal";
import { authenticate, useAuth } from "@/lib/auth";
import type { AgroUser } from "@/lib/auth";
import { isMsgKey, useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";

type Mode = "password" | "otp" | "register";

const Page = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--paper);
`;

const TopBar = styled.header`
  width: 100%;
  flex-shrink: 0;
  min-height: calc(64px + env(safe-area-inset-top));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: env(safe-area-inset-top) max(16px, env(safe-area-inset-right)) 0
    max(16px, env(safe-area-inset-left));
  background: #fffcf7;
  border-bottom: 1px solid var(--line);
  z-index: 20;

  @media (min-width: 768px) {
    min-height: calc(76px + env(safe-area-inset-top));
    padding: env(safe-area-inset-top) max(40px, env(safe-area-inset-right)) 0
      max(40px, env(safe-area-inset-left));
  }
`;

const Hero = styled.section`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: grid;
  align-items: center;
  min-height: calc(100dvh - 64px - env(safe-area-inset-top));
  padding: 16px 16px 20px;

  @media (min-width: 768px) {
    min-height: calc(100dvh - 76px - env(safe-area-inset-top));
    padding: 20px 32px 24px;
  }

  @media (min-width: 980px) {
    padding: 24px 40px 28px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: -4%;
  background:
    linear-gradient(105deg, rgba(8, 32, 24, 0.88) 0%, rgba(15, 61, 46, 0.72) 42%, rgba(15, 61, 46, 0.45) 100%),
    url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=80")
      center/cover;
  animation: kenburns 22s ease-out forwards;
`;

const HeroGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  align-items: center;
  min-width: 0;

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
    gap: 36px;
  }
`;

const Copy = styled.div`
  color: #fff;
  max-width: 620px;
  min-width: 0;
`;

const Stage = styled.div`
  width: 100%;
  max-width: 420px;
  min-width: 0;
  margin-inline: auto;
  order: -1;

  @media (min-width: 980px) {
    order: 0;
    max-width: none;
    margin-inline: 0;
  }
`;

const LoginCard = styled.section`
  scroll-margin-top: 80px;
  background: rgba(255, 252, 247, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  box-shadow:
    0 24px 56px -28px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(15, 61, 46, 0.04);
  padding: 16px 16px 14px;
  min-width: 0;

  label {
    margin-bottom: 10px;
  }

  input,
  select {
    padding-top: 11px;
    padding-bottom: 11px;
  }

  @media (min-width: 480px) {
    padding: 20px 22px 18px;
    border-radius: 20px;
  }
`;

const Stats = styled.div`
  display: none;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;

  @media (min-width: 980px) {
    display: flex;
  }
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const Banner = styled.div<{ $ok?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
  background: ${(p) => (p.$ok ? "var(--mist)" : "var(--danger-bg)")};
  color: ${(p) => (p.$ok ? "var(--forest)" : "var(--danger)")};
  border: 1px solid ${(p) => (p.$ok ? "var(--line)" : "#f0c7c0")};
`;

const ToggleEye = styled.button`
  position: absolute;
  right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--mist);
  border: none;
  border-radius: 8px;
  padding: 6px 8px;
  color: var(--sage);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  span {
    display: none;
  }

  @media (min-width: 420px) {
    right: 10px;
    padding: 6px 10px;

    span {
      display: inline;
    }
  }
`;

const OtpRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 4px;

  input {
    text-align: center;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: 0;
    padding: 10px 0;
    min-width: 0;
  }

  @media (min-width: 400px) {
    gap: 8px;

    input {
      font-size: 18px;
      padding: 12px 0;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
  color: var(--sage);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--line);
  }
`;

const GhostBtn = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1.5px solid var(--line);
  background: var(--mist);
  color: var(--canopy);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 44px;
  text-align: center;

  &:hover {
    border-color: var(--fresh);
  }
`;

const Success = styled.div`
  text-align: center;
  padding: 28px 8px 12px;
`;

const CheckMark = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--mist);
  border: 2px solid var(--fresh);
  color: var(--canopy);
`;

type DemoAccount = {
  name: string;
  mobile: string;
  password: string;
  otp: string;
};

export function LoginView() {
  const router = useRouter();
  const { login, user, ready } = useAuth();
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>("password");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<MsgKey | "">("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [remember, setRemember] = useState(true);
  const [notice, setNotice] = useState<MsgKey | "">("");
  const [accounts, setAccounts] = useState<DemoAccount[]>([]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otpValue = useMemo(() => otp.join(""), [otp]);
  const demo = accounts[0];

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setNotice("");
  }

  useEffect(() => {
    if (ready && user) router.replace("/home");
  }, [ready, user, router]);

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("mode");
    if (next === "otp" || next === "register" || next === "password") setMode(next);
  }, []);

  useEffect(() => {
    fetch("/api/auth/login")
      .then((res) => res.json())
      .then((data: { accounts?: DemoAccount[] }) => setAccounts(data.accounts ?? []))
      .catch(() => setAccounts([]));
  }, []);

  function digitsOnly(value: string, max: number) {
    return value.replace(/\D/g, "").slice(0, max);
  }

  async function finish(next: AgroUser) {
    setDone(true);
    login(next, remember);
    window.setTimeout(() => router.replace("/home"), 900);
  }

  function fillOtp(raw: string, fromIndex = 0) {
    const digits = digitsOnly(raw, 6);
    if (!digits) return;
    const next = [...otp];
    const start = digits.length >= 6 ? 0 : fromIndex;
    const slice = digits.slice(0, 6 - start);
    for (let i = 0; i < slice.length; i++) next[start + i] = slice[i];
    setOtp(next);
    otpRefs.current[Math.min(start + slice.length, 5)]?.focus();
  }

  function onOtpChange(index: number, value: string) {
    const digits = digitsOnly(value, 6);
    if (digits.length > 1) {
      fillOtp(digits, index);
      return;
    }
    const next = [...otp];
    next[index] = digits;
    setOtp(next);
    if (digits && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function onOtpPaste(index: number, e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    fillOtp(e.clipboardData.getData("text"), index);
  }

  function onOtpKeyDown(index: number, key: string) {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  async function handlePassword(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(mobile)) {
      setError("errMobile");
      return;
    }
    if (!password) {
      setError("enterPassword");
      return;
    }
    setLoading(true);
    try {
      const next = await authenticate({ method: "password", mobile, password });
      await finish(next);
    } catch (err) {
      const code = err instanceof Error ? err.message : "LOGIN_FAILED";
      setError(isMsgKey(code) ? code : "LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtp(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(mobile)) {
      setError("errMobile");
      return;
    }
    if (!/^\d{6}$/.test(otpValue)) {
      setError("errOtp");
      return;
    }
    setLoading(true);
    try {
      const next = await authenticate({ method: "otp", mobile, otp: otpValue });
      await finish(next);
    } catch (err) {
      const code = err instanceof Error ? err.message : "LOGIN_FAILED";
      setError(isMsgKey(code) ? code : "LOGIN_FAILED");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 3) {
      setError("enterName");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError("errMobile");
      return;
    }
    if (password.length < 6) {
      setError("errPwShort");
      return;
    }
    setError("errRegisterDummy");
  }

  const titles: Record<Mode, { h: MsgKey; s: MsgKey }> = {
    password: { h: "welcomeTitle", s: "welcomeSub" },
    otp: { h: "otpTitle", s: "otpSub" },
    register: { h: "registerTitle", s: "registerSub" },
  };

  return (
    <Page>
      <TopBar>
        <Reveal variant="down" immediate className="flex h-16 w-full min-w-0 items-center justify-between gap-2 md:h-[76px]">
          <BrandMark href="/" />
          <div className="flex min-w-0 items-center gap-2">
            <ButtonLink $variant="outline" href="/present" className="hidden sm:inline-flex">
              <Presentation size={16} /> {t("navPresent")}
            </ButtonLink>
            <LanguageSwitch />
          </div>
        </Reveal>
      </TopBar>

      <Hero>
        <HeroBg />
        <HeroGrid className="relative z-[1]">
          <Reveal variant="left" immediate>
            <Copy>
              <p className="text-[12px] font-bold tracking-[0.18em] text-gold-soft uppercase">
                {t("brandTag")}
              </p>
              <h1 className="font-display mt-2 text-[24px] leading-[1.12] font-extrabold sm:text-[32px] lg:text-[40px]">
                {t("loginHeroTitle")}
              </h1>
              <p className="mt-2 max-w-[40ch] text-[14px] leading-6 text-white/85 sm:text-[15px]">
                {t("loginHeroQuote")}
              </p>
              <Stats>
                <Reveal as="span" delay={80}>
                  <Stat>{t("statFarmers")}</Stat>
                </Reveal>
                <Reveal as="span" delay={160}>
                  <Stat>{t("statMarkets")}</Stat>
                </Reveal>
                <Reveal as="span" delay={240}>
                  <Stat>{t("statSecure")}</Stat>
                </Reveal>
              </Stats>
            </Copy>
          </Reveal>

          <Reveal variant="right" delay={140} immediate>
            <Stage>
            <LoginCard id="login">
              {done ? (
                <Success>
                  <CheckMark>
                    <Check size={32} />
                  </CheckMark>
                  <h2 className="font-display text-[24px] font-extrabold text-forest">
                    {t("loginSuccess")}
                  </h2>
                  <p className="mt-2 text-[14px] text-sage">{t("openingHome")}</p>
                </Success>
              ) : (
                <>
                  <h2 className="font-display text-[20px] font-extrabold text-forest sm:text-[22px]">
                    {t(titles[mode].h)}
                  </h2>
                  <p className="mt-1 mb-3 text-[13px] text-sage">{t(titles[mode].s)}</p>

                  {error && <Banner>{t(error)}</Banner>}
                  {notice && !error && <Banner $ok>{t(notice)}</Banner>}

                  {mode === "password" && (
                    <form onSubmit={handlePassword}>
                      <MobileField value={mobile} onChange={setMobile} />
                      <Field>
                        <span>{t("password")}</span>
                        <InputShell $error={Boolean(error) && !password}>
                          <input
                            type={showPw ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("passwordPlaceholder")}
                            autoComplete="current-password"
                            className="pr-12 min-[420px]:pr-[84px]"
                          />
                          <ToggleEye type="button" onClick={() => setShowPw((v) => !v)}>
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span>{showPw ? t("hide") : t("show")}</span>
                          </ToggleEye>
                        </InputShell>
                      </Field>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[13px] sm:text-[13.5px]">
                        <label className="flex items-center gap-2 font-medium text-sage">
                          <input
                            type="checkbox"
                            className="accent-canopy h-4 w-4"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                          />
                          {t("remember")}
                        </label>
                        <button
                          type="button"
                          className="font-bold text-canopy"
                          onClick={() => {
                            setMode("otp");
                            setError("");
                            setNotice("forgotHint");
                          }}
                        >
                          {t("forgot")}
                        </button>
                      </div>
                      <Button $block disabled={loading} type="submit">
                        {loading && <RoundLoader size={22} onDark />}
                        {loading ? t("loggingIn") : t("login")}
                      </Button>
                      <Divider>{t("or")}</Divider>
                      <GhostBtn
                        type="button"
                          onClick={() => switchMode("otp")}
                      >
                        <Smartphone size={16} /> {t("loginOtp")}
                      </GhostBtn>
                    </form>
                  )}

                  {mode === "otp" && (
                    <form onSubmit={handleOtp}>
                      <MobileField value={mobile} onChange={setMobile} />
                      <Field>
                        <span>{t("enterOtp")}</span>
                        <OtpRow>
                          {otp.map((d, i) => (
                            <InputShell key={i}>
                              <input
                                ref={(el) => {
                                  otpRefs.current[i] = el;
                                }}
                                inputMode="numeric"
                                maxLength={1}
                                autoComplete={i === 0 ? "one-time-code" : "off"}
                                value={d}
                                onChange={(e) => onOtpChange(i, e.target.value)}
                                onPaste={(e) => onOtpPaste(i, e)}
                                onKeyDown={(e) => onOtpKeyDown(i, e.key)}
                                aria-label={`OTP digit ${i + 1}`}
                              />
                            </InputShell>
                          ))}
                        </OtpRow>
                      </Field>
                      <Button $block disabled={loading} type="submit">
                        {loading && <RoundLoader size={22} onDark />}
                        {loading ? t("verifying") : t("verify")}
                      </Button>
                      <Divider>{t("or")}</Divider>
                      <GhostBtn
                        type="button"
                          onClick={() => switchMode("password")}
                      >
                        <KeyRound size={16} /> {t("loginPassword")}
                      </GhostBtn>
                    </form>
                  )}

                  {mode === "register" && (
                    <form onSubmit={handleRegister}>
                      <Field>
                        <span>{t("fullName")}</span>
                        <InputShell>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ram Kishan"
                            autoComplete="name"
                          />
                        </InputShell>
                      </Field>
                      <MobileField value={mobile} onChange={setMobile} />
                      <Field>
                        <span>{t("createPassword")}</span>
                        <InputShell>
                          <input
                            type={showPw ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("pwPlaceholder")}
                            autoComplete="new-password"
                            className="pr-12 min-[420px]:pr-[84px]"
                          />
                          <ToggleEye type="button" onClick={() => setShowPw((v) => !v)}>
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span>{showPw ? t("hide") : t("show")}</span>
                          </ToggleEye>
                        </InputShell>
                      </Field>
                      <Button $block disabled={loading} type="submit">
                        {loading && <RoundLoader size={22} onDark />}
                        {loading ? t("creating") : t("createAccount")}
                      </Button>
                    </form>
                  )}

                  <p className="mt-3 text-center text-[13px] text-sage">
                    {mode === "register" ? (
                      <>
                        {t("haveAccount")}{" "}
                        <button
                          type="button"
                          className="font-extrabold text-canopy"
                          onClick={() => switchMode("password")}
                        >
                          {t("login")}
                        </button>
                      </>
                    ) : (
                      <>
                        {t("noAccount")}{" "}
                        <button
                          type="button"
                          className="font-extrabold text-canopy"
                          onClick={() => switchMode("register")}
                        >
                          {t("registerNow")}
                        </button>
                      </>
                    )}
                  </p>
                  {demo && (
                    <p className="mt-2 break-words rounded-[10px] border border-dashed border-line bg-mist px-3 py-2 text-[11px] leading-4 text-sage">
                      {t("dummyJson")}: <b className="text-ink">{demo.name}</b> · {t("mobile")}{" "}
                      <b className="text-ink">{demo.mobile}</b> · {t("demoPassword")}{" "}
                      <b className="text-ink">{demo.password}</b> · {t("otp")}{" "}
                      <b className="text-ink">{demo.otp}</b>
                    </p>
                  )}
                </>
              )}
            </LoginCard>
            </Stage>
          </Reveal>
        </HeroGrid>
      </Hero>

      <SiteFooter />

      {(loading || done) && (
        <RoundLoader
          overlay
          size={104}
          label={done ? t("openingHome") : mode === "otp" ? t("verifying") : t("loggingIn")}
        />
      )}
    </Page>
  );
}

function MobileField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useI18n();
  return (
    <Field>
      <span>{t("mobileNumber")}</span>
      <InputShell>
        <Prefix>+91</Prefix>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="98765 43210"
          autoComplete="tel"
          className="has-prefix"
          style={{ paddingLeft: 52 }}
        />
      </InputShell>
    </Field>
  );
}
