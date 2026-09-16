"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./ui";
import { Reveal } from "./Reveal";

const RATES = [
  ["Wheat", "₹2,450 / qtl"],
  ["Basmati", "₹3,820 / qtl"],
  ["Maize", "₹1,980 / qtl"],
  ["Soybean", "₹4,210 / qtl"],
  ["Mustard", "₹5,640 / qtl"],
  ["Cotton", "₹6,150 / qtl"],
  ["Onion", "₹1,240 / qtl"],
  ["Tomato", "₹1,680 / qtl"],
];

const CHAPTERS = [
  {
    n: "01",
    title: "Select the crop",
    dek: "Fasal aur quantity — wheat se onion tak.",
    copy: "Jo ugaya hai, usi plate se shuru. Crop choose kijiye, weight likhiye, aage badhiye.",
  },
  {
    n: "02",
    title: "Pay the token",
    dek: "₹500. Slot reserved.",
    copy: "Chhota sa token, bada vishwas. Baaki daam tab settle hota hai jab fasal bik jaati hai.",
  },
  {
    n: "03",
    title: "Book the hour",
    dek: "Apna din, apna time.",
    copy: "Calendar khuliye. Pickup wahi aata hai jo aapne chuna — subah ki oas ya dopahar ki dhoop.",
  },
  {
    n: "04",
    title: "Follow the harvest",
    dek: "Khet se mandi, live.",
    copy: "Gaadi nikalte hi map chal padta hai. Quality check, bazaar, payment — har chapter screen par.",
  },
];

const PLATES = [
  {
    name: "Wheat",
    place: "Punjab plains",
    plate: "Plate 01",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    span: "lg:col-span-7 lg:row-span-2 min-h-[420px] lg:min-h-full",
  },
  {
    name: "Rice",
    place: "Basmati belt",
    plate: "Plate 02",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    span: "lg:col-span-5 min-h-[240px]",
  },
  {
    name: "Mustard",
    place: "Rajasthan gold",
    plate: "Plate 03",
    img: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=900&q=80",
    span: "lg:col-span-5 min-h-[240px]",
  },
];

const LEAD_VOICE = {
  quote:
    "Pehle dalal 200 rupaye kaat leta tha. Ab mandi ka rate screen par dikhta hai, aur gaadi khet se fasal le jaati hai.",
  name: "Ram Kishan",
  place: "Karnal, Haryana",
  crop: "Wheat, rabi 2026",
  img: "https://images.unsplash.com/photo-1500937386664-56d1dfef385b?auto=format&fit=crop&w=1200&q=80",
};

const MORE_VOICES = [
  {
    quote:
      "Slot book kiya subah 10 baje ka. Pickup time pe aaya, payment usi shaam settle. Simple — jaise naam hai.",
    name: "Sunita Devi",
    place: "Nashik, Maharashtra",
    crop: "Onion",
  },
  {
    quote:
      "OTP se login, fasal select, ₹500 token. Teen minute. Mera beta kehta hai — yeh toh phone wala mandi hai.",
    name: "Gurpreet Singh",
    place: "Ludhiana, Punjab",
    crop: "Basmati",
  },
];

export function LandingSections() {
  return (
    <>
      <FolioTicker />
      <EditorsLetter />
      <Chapters />
      <FeatureEssay />
      <Plates />
      <Voices />
      <BackCover />
    </>
  );
}

export function LandingView() {
  return (
    <div className="min-h-screen bg-journal text-journal-ink">
      <LandingSections />
    </div>
  );
}

function FolioTicker() {
  const loop = [...RATES, ...RATES];
  return (
    <Reveal>
      <div className="border-y border-line bg-[#1a1812] text-[#f4ead8]">
        <div className="overflow-hidden py-3">
          <div className="animate-marquee flex w-max gap-12 pr-12">
            {loop.map(([crop, rate], i) => (
              <span
                key={`${crop}-${i}`}
                className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase"
              >
                <span className="text-white/50">{crop}</span>
                <span className="text-gold-soft">{rate}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function EditorsLetter() {
  return (
    <section className="w-full px-5 py-20 md:px-8 md:py-28 lg:px-10">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.2fr]">
        <Reveal variant="left">
          <p className="small-caps text-gold">From the editor</p>
          <h2 className="font-serif mt-4 text-[42px] leading-[1.05] text-forest md:text-[58px]">
            Mandi ab
            <br />
            ek journal hai.
          </h2>
          <p className="mt-8 text-[12px] font-semibold tracking-[0.2em] text-sage uppercase">
            Vol. 01 / Letter 01 / 4 min
          </p>
        </Reveal>
        <Reveal variant="right" delay={120}>
          <p className="drop-cap font-serif text-[19px] leading-[1.75] text-ink md:text-[21px]">
            Har mausam ek naya issue hota hai. Rabi ki gold, kharif ki hari. Phir bhi kisan
            ka sawal wahi rehta hai: fasal bechega kaun, kis daam par, aur kab paisa aayega?
            Agro Connect us sawal ka jawab hai — khet se bazaar tak ka ek simple raasta.
          </p>
          <p className="mt-6 font-serif text-[19px] leading-[1.75] text-sage md:text-[21px]">
            Is ank mein char adhyay hain. Crop chuniye. Token dijiye. Slot book kijiye.
            Phir apni fasal ko mandi tak jaate dekhiye. Behtar daam. Seedha pickup. Poora
            hisaab.
          </p>
          <p className="font-serif mt-10 text-[15px] text-forest italic">
            — The Agro Connect desk, September 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Chapters() {
  return (
    <section className="border-y border-[#d9d0bb] bg-journal-deep">
      <div className="w-full px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="small-caps text-gold">Contents</p>
            <h2 className="font-serif mt-3 text-[40px] leading-tight text-forest md:text-[52px]">
              Char adhyay.
            </h2>
          </div>
          <p className="max-w-[32ch] text-[14px] leading-6 text-sage">
            Ek issue, chaar chapters. Fasal bechna ab app ka form nahi — ek kahani hai.
          </p>
        </Reveal>

        <ol className="mt-14 divide-y divide-[#d9d0bb] border-y border-[#d9d0bb]">
          {CHAPTERS.map((ch, index) => (
            <Reveal key={ch.n} as="li" delay={index * 80} className="grid gap-4 py-8 md:grid-cols-[88px_1fr_1.2fr] md:items-baseline">
              <span className="font-serif text-[28px] text-gold">{ch.n}</span>
              <div>
                <h3 className="font-serif text-[28px] leading-tight text-forest md:text-[32px]">
                  {ch.title}
                </h3>
                <p className="mt-2 text-[13px] tracking-wide text-sage italic">{ch.dek}</p>
              </div>
              <p className="max-w-[48ch] text-[15px] leading-7 text-journal-ink/80">{ch.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FeatureEssay() {
  return (
    <section className="w-full px-5 py-20 md:px-8 md:py-28 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <Reveal variant="left" className="relative min-h-[520px] overflow-hidden bg-forest">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80"
            alt="Rows of green crop stretching to the horizon"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <p className="absolute bottom-5 left-5 text-[11px] tracking-[0.2em] text-white/80 uppercase">
            Fig. 04 · The long field, dawn
          </p>
        </Reveal>
        <Reveal variant="right" delay={140} className="lg:pb-8">
          <p className="small-caps text-gold">The argument</p>
          <h2 className="font-serif mt-4 text-[40px] leading-[1.08] text-forest md:text-[52px]">
            Phone par mandi.
            <br />
            Khet par izzat.
          </h2>
          <blockquote className="mt-8 border-l border-gold pl-5">
            <p className="font-serif text-[22px] leading-8 text-ink italic">
              Beech ke aadmi ke bina live rate. Farm tak gaadi. Token se lekar settlement
              tak — har rupaya dikhta hai.
            </p>
          </blockquote>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#d9d0bb] pt-6">
            {[
              ["50,000+", "kisan"],
              ["100+", "mandis"],
              ["24", "states"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-serif text-[28px] text-forest">{n}</dt>
                <dd className="text-[11px] tracking-[0.16em] text-sage uppercase">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Plates() {
  return (
    <section className="bg-[#1a1812] text-[#f4ead8]">
      <div className="w-full px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="small-caps text-gold-soft">The portfolio</p>
            <h2 className="font-serif mt-3 text-[40px] text-[#f4ead8] md:text-[52px]">
              Jo ugaya, woh bechiye.
            </h2>
          </div>
          <ButtonLink href="/#login" $variant="ink">
            Sell a plate
          </ButtonLink>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:h-[640px]">
          {PLATES.map((p, index) => (
            <Reveal
              key={p.name}
              delay={index * 100}
              variant="scale"
              className={`relative overflow-hidden ${p.span}`}
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] tracking-[0.22em] text-gold-soft uppercase">{p.plate}</p>
                <h3 className="font-serif mt-1 text-[32px]">{p.name}</h3>
                <p className="text-[13px] text-white/70">{p.place}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="w-full px-5 py-20 md:px-8 md:py-28 lg:px-10">
      <Reveal>
        <p className="small-caps text-gold">Interviews</p>
      <h2 className="font-serif mt-3 text-[40px] text-forest md:text-[52px]">
        Jo bech chuke hain.
      </h2>
      </Reveal>

      <article className="mt-12 grid gap-8 border-t border-[#d9d0bb] pt-10 lg:grid-cols-2">
        <Reveal variant="left" className="relative min-h-[380px] overflow-hidden">
          <Image
            src={LEAD_VOICE.img}
            alt={LEAD_VOICE.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>
        <Reveal variant="right" delay={120} className="flex flex-col justify-center">
          <p className="font-serif text-[28px] leading-[1.35] text-journal-ink italic md:text-[34px]">
            “{LEAD_VOICE.quote}”
          </p>
          <div className="mt-8">
            <p className="text-[15px] font-semibold tracking-[0.08em] text-forest uppercase">
              {LEAD_VOICE.name}
            </p>
            <p className="mt-1 text-[14px] text-sage">
              {LEAD_VOICE.place} · {LEAD_VOICE.crop}
            </p>
          </div>
        </Reveal>
      </article>

      <div className="mt-6 grid gap-0 border-t border-[#d9d0bb] md:grid-cols-2">
        {MORE_VOICES.map((v, index) => (
          <Reveal key={v.name} delay={index * 100} as="blockquote" className="border-[#d9d0bb] py-10 md:px-10 md:py-12 md:odd:border-r md:odd:pl-0">
            <p className="font-serif text-[22px] leading-8 text-journal-ink italic">“{v.quote}”</p>
            <footer className="mt-6 text-[13px] tracking-[0.08em] text-sage uppercase">
              {v.name} · {v.place} · {v.crop}
            </footer>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BackCover() {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <Image
        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2000&q=80"
        alt="Open farmland under a wide sky"
        fill
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="relative mx-auto max-w-[900px] px-5 py-28 text-center md:px-8 md:py-36">
        <Reveal variant="scale">
        <p className="small-caps text-gold-soft">Back cover</p>
        <h2 className="font-serif mt-6 text-[44px] leading-[1.05] md:text-[68px]">
          Aaj hi apni fasal
          <br />
          ka bazaar kholiye.
        </h2>
        <p className="mx-auto mt-6 max-w-[40ch] text-[16px] leading-7 text-white/75">
          Char adhyay kholiye — crop, token, slot, tracking. Aapka bazaar yahin se shuru.
        </p>
        <div className="mt-10">
          <ButtonLink href="/#login" $variant="editorial">
            Start selling
          </ButtonLink>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
