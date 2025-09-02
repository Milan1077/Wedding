import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { CalendarDays, MapPin, Clock, Sparkles } from "lucide-react";

// === Helper: Countdown ===
function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

// === Helper: Scroll Reveal Wrapper ===
function Reveal({ children, y = 24, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// === Split Hero (three vertical panels sliding in) ===
function SplitHero({ imageUrl, titleLeft, ampersand, titleRight }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#f3ebe4] overflow-hidden">
      <div className="absolute top-6 w-full flex items-center justify-center">
        <div className="text-3xl italic tracking-widest select-none">D & M</div>
      </div>
      <div className="max-w-sm w-[92%] mx-auto">
        <div className="relative h-[64vh] grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="relative rounded-md overflow-hidden shadow-md"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 * i }}
            >
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: `${i === 1 ? "center" : i === 0 ? "left" : "right"} center` }}
              />
            </motion.div>
          ))}
          {/* Overlay names */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="font-edwardian text-white drop-shadow text-5xl sm:text-6xl md:text-7xl select-none -rotate-2">
              <span className="absolute -left-2 -top-12 sm:-top-16 md:-top-20 lg:-top-24">{titleLeft}</span>
              <span className="">{ampersand}</span>
              <span className="absolute right-2 top-12 sm:top-16 md:top-20 lg:top-24">{titleRight}</span>
            </div>
          </div>
        </div>
        <Reveal>
          <div className="mt-6 text-center">
            <div className="tracking-[0.35em] text-sm">26.09.25</div>
            <div className="mx-auto mt-2 h-[1px] w-24 bg-neutral-400/40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-black/5">
      {children}
    </div>
  );
}

function TimelineItem({ time, title, icon, side = "left" }) {
  return (
    <div className={`grid grid-cols-5 items-start gap-4 ${side === "left" ? "text-right" : "text-left"}`}>
      {side === "left" ? (
        <div className="col-span-2">
          <div className="font-semibold">{time}</div>
          <div className="opacity-70 text-sm">{title}</div>
        </div>
      ) : (
        <div className="col-span-2 order-last">
          <div className="font-semibold">{time}</div>
          <div className="opacity-70 text-sm">{title}</div>
        </div>
      )}
      <div className="col-span-1 flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-black/70" />
        <div className="w-[2px] h-16 bg-black/20" />
      </div>
      {side === "left" ? (
        <div className="col-span-2">{icon}</div>
      ) : (
        <div className="col-span-2 order-first">{icon}</div>
      )}
    </div>
  );
}

export default function WeddingInviteReplica() {
  const target = useMemo(() => new Date("2025-09-26T11:00:00"), []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <div className="bg-[#efe7df] text-[#2a2a2a] selection:bg-black selection:text-white">
      {/* HERO */}
      <SplitHero
        imageUrl="/img/img1.JPG"
        titleLeft="Dinesh"
        ampersand="&"
        titleRight="Melina"
      />

      {/* Intro Copy */}
      <section className="max-w-lg mx-auto px-5 pb-12 -mt-8">
        <Reveal>
          <p className="text-center tracking-wide leading-relaxed uppercase text-[25px]">
          LOVE LOVELOVE
          LOVE
          LOVE
          LOVE

            Our oUR happiness is only complete when we share it with the people we love. It would make us immensely happy to have you join us at the beginning of our life together.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-8 text-center">
            <div className="font-serif italic text-lg mb-2">Countdown</div>
            <div className="flex items-center justify-center gap-3 font-mono text-xl">
              <span>{String(days).padStart(2, "0")}</span>:
              <span>{String(hours).padStart(2, "0")}</span>:
              <span>{String(minutes).padStart(2, "0")}</span>:
              <span>{String(seconds).padStart(2, "0")}</span>
            </div>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase opacity-70">
              Days Hours Minutes Seconds
            </div>
          </div>
        </Reveal>
      </section>

      {/* Parents / Blessing */}
      <section className="max-w-lg mx-auto px-5 pb-8">
        <Card>
          <Reveal>
            <h2 className="font-serif italic text-center text-2xl mb-4">
              With the blessing of God, our parents and godparents
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 text-center text-sm">
            <div>
              <div className="font-semibold tracking-wide">Bride's parents</div>
              <div>Basu Ghimire</div>
              <div>Something Ghimire</div>
            </div>
            <div>
              <div className="font-semibold tracking-wide">Groom's parents</div>
              <div>Lok Prasad Tiwari</div>
              <div>Sarita Tiwari</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Big Photo */}
      <section className="max-w-lg mx-auto px-5 pb-8">
        <Reveal>
          <img
            alt="couple"
            className="w-full rounded-xl shadow-md"
            src="/img/img2.JPG"
          />
        </Reveal>
      </section>

      {/* Ceremony & Reception Cards */}
      <section className="max-w-lg mx-auto px-5 pb-8 space-y-6">
        <Reveal>
          <Card>
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1" />
              <div>
                <div className="font-serif italic">Wedding Ceremony</div>
                <div className="font-bold tracking-wide">Royal Durbar</div>
                <div className="text-xs opacity-70">Mulpani, Kathmandu</div>
                <div className="flex items-center gap-2 mt-1 text-sm"><Clock size={16}/> 11:00 AM</div>
                <a href="https://www.google.com/maps/place/Royal+Palace/@27.7215654,85.388805,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1b3895676363:0xd56e02c8ed6b45ff!8m2!3d27.7215607!4d85.3913799!16s%2Fg%2F11tmk2fhs5?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D " target="_blank" className="inline-block mt-3 px-4 py-2 rounded-md border text-sm hover:bg-black hover:text-white transition">See location</a>
              </div>
            </div>
          </Card>
        </Reveal>
        
      </section>

      <section className="max-w-lg mx-auto px-5 pb-8">
        <Reveal>
          <img
            alt="dance"
            className="w-full rounded-xl shadow-md"
            src="/img/img3.JPG"
          />
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="max-w-lg mx-auto px-5 pb-10">
        <Card>
          <Reveal>
            <h3 className="font-serif italic text-2xl text-center mb-6">Wedding Program</h3>
          </Reveal>
          <div className="space-y-3">
            <Reveal><TimelineItem time="5:00 PM" title="Religious Ceremony" icon={<div className="opacity-70">💍</div>} side="right"/></Reveal>
            <Reveal delay={0.05}><TimelineItem time="7:00 PM" title="Civil Ceremony & Reception" icon={<div className="opacity-70">⛪</div>} side="left"/></Reveal>
            <Reveal delay={0.1}><TimelineItem time="9:00 PM" title="Toast" icon={<div className="opacity-70">🥂</div>} side="right"/></Reveal>
            <Reveal delay={0.15}><TimelineItem time="9:30 PM" title="Couple's Waltz" icon={<div className="opacity-70">💃</div>} side="left"/></Reveal>
            <Reveal delay={0.2}><TimelineItem time="12:00 AM" title="Late-night Dinner" icon={<div className="opacity-70">🍽️</div>} side="right"/></Reveal>
          </div>
        </Card>
      </section>



      <section className="max-w-lg mx-auto px-5 pb-8">
        <Reveal>
          <img
            alt="stairs"
            className="w-full rounded-xl shadow-md"
            src="/img/img4.JPG"
          />
        </Reveal>
      </section>

      {/* Dress Code */}
      <section className="max-w-lg mx-auto px-5 pb-2">
        <Reveal>
          <Card>
            <div className="text-center">
              <div className="tracking-wide font-semibold mb-2">Formal attire</div>
              <p className="text-sm opacity-80">We kindly ask guests to avoid these colors:</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="w-8 h-8 rounded-full bg-black" />
                <div className="w-8 h-8 rounded-full bg-[#f3ebe4] border" />
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* RSVP */}
      <section className="max-w-lg mx-auto px-5 pb-10">
        <Reveal>
          <div className="text-center">
            <div className="font-serif italic text-2xl">Confirm your attendance</div>
            <p className="text-sm opacity-80 mt-2">Please let us know if you will attend our wedding before September 17, 2025.</p>
            <a href="#" className="inline-block mt-4 px-6 py-3 rounded-md border shadow-sm hover:bg-black hover:text-white transition">Confirm</a>
          </div>
        </Reveal>
      </section>

      {/* Final Photo + Thanks */}
      <section className="max-w-lg mx-auto px-5 pb-20">
        <Reveal>
         <img
           // alt="final"
            className="w-full rounded-xl shadow-md mb-6"
           // src="https://images.unsplash.com/photo-1460364157752-926555421a7e?q=80&w=1200&auto=format&fit=crop"
          />
        </Reveal>
        <Reveal>
          <div className="text-center space-y-2">
            <p className="uppercase tracking-wide text-sm">Thank you for joining us in this very important moment for us.</p>
            <div className="italic">With love: Dinesh & Melina</div>
            <div className="text-2xl italic">D & M</div>
          </div>
        </Reveal>
      </section>

      {/* Footer bar to mimic Canva badge */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black text-white text-xs py-2 px-4 flex items-center justify-between">
        <div>Thank You!!</div>
      </footer>
    </div>
  );
}