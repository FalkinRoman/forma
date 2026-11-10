import { cn } from "@/lib/cn";

/* Знаки платёжных сервисов. Источники: ЮKassa и СБП — SVG из webasyst-framework (GitHub),
   Сбер — react-pay-icons (npm). Перед релизом сверить с официальными брендбуками. */

export type PaymentBrand = "yookassa" | "sbp" | "sber";

const titles: Record<PaymentBrand, string> = { yookassa: "ЮKassa", sbp: "СБП", sber: "СберБанк" };

function Glyph({ brand }: { brand: PaymentBrand }) {
  switch (brand) {
    case "yookassa":
      return (
        <svg viewBox="0 0 92 64" className="h-[15px] w-auto" aria-hidden>
          <path fillRule="evenodd" clipRule="evenodd" fill="#0070f0" d="m26.4424 31.7092c.0477-17.4683 14.4906-31.7092 32.6397-31.7092 17.9726 0 32.8465 14.288 32.6399 31.7959 0 17.5079-14.6673 31.7959-32.6399 31.7959-17.9431 0-32.5917-14.0406-32.6397-31.7088v23.6592h-11.5685l-14.8739-46.2852h26.4424zm20.4514.0867c0 6.4397 5.5777 11.8732 12.1883 11.8732 6.8172 0 12.1884-5.4335 12.1884-11.8732s-5.5777-11.8731-12.1884-11.8731c-6.6106 0-12.1883 5.4334-12.1883 11.8731z" />
        </svg>
      );
    case "sbp":
      return (
        <svg viewBox="14 3 101 124" className="h-[22px] w-auto" aria-hidden>
          <path fill="#5b57a2" d="M 16 31.120003 L 30.532 57.095001 L 30.532 72.939003 L 16.017 98.862999 L 16 31.120003 Z"/> <path fill="#d90751" d="M 71.797005 47.643005 L 85.414001 39.296997 L 113.281998 39.270996 L 71.797005 64.684998 L 71.797005 47.643005 Z"/> <path fill="#fab718" d="M 71.720001 30.966995 L 71.796997 65.356995 L 57.230999 56.406998 L 57.230999 5 L 71.721001 30.966995 Z"/> <path fill="#ed6f26" d="M 113.281998 39.270996 L 85.413002 39.296997 L 71.720001 30.966995 L 57.230999 5 L 113.280998 39.270996 Z"/> <path fill="#63b22f" d="M 71.796997 99.007004 L 71.796997 82.321999 L 57.230999 73.542 L 57.238998 125 L 71.796997 99.007004 Z"/> <path fill="#1487c9" d="M 85.379997 90.737 L 30.531 57.095001 L 16 31.120003 L 113.223 90.703003 L 85.378998 90.737 Z"/> <path fill="#017f36" d="M 57.240002 125 L 71.796005 99.007004 L 85.378998 90.737 L 113.222 90.703003 L 57.240002 125 Z"/> <path fill="#984995" d="M 16.017 98.862999 L 57.349998 73.542999 L 43.453999 65.016998 L 30.532 72.939003 L 16.017 98.862999 Z"/> 
        </svg>
      );
    case "sber":
      return (
        <svg viewBox="0 0 32 32" className="h-[22px] w-auto" aria-hidden>
          <circle cx="16" cy="16" r="16" fill="#21A038" />
          <path fill="#fff" d="m22.681 7.368.945.858-11.932 6.812-5.776-3.325.54-1.073 5.236 2.977zM20.279 6l1.268.644-9.853 5.632-4.588-2.602.782-.938 3.806 2.172L20.28 6zm4.184 3.111.701.939-13.47 7.697-6.505-3.701.297-1.18 6.208 3.54zm1.943 3.46Q27 14.234 27 16.057q0 1.825-.594 3.54l-.27.725a11.1 11.1 0 0 1-2.348 3.486 10.9 10.9 0 0 1-3.51 2.307Q18.201 27 15.987 27q-2.241 0-4.293-.885a11.3 11.3 0 0 1-3.482-2.307 10.6 10.6 0 0 1-2.348-3.486c-.57-1.35-.865-2.8-.864-4.265v-.724l6.694 3.782 14.118-8.046z" />
        </svg>
      );
  }
}

export function PaymentMark({ brand, size = 40, className }: { brand: PaymentBrand; size?: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label={titles[brand]}
      title={titles[brand]}
      style={{ width: size, height: size }}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-[12px] border border-line bg-surface shadow-xs", className)}
    >
      <Glyph brand={brand} />
    </span>
  );
}

export function PaymentMarks({ brands = ["yookassa", "sbp", "sber"], className }: { brands?: PaymentBrand[]; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {brands.map((b) => (
        <PaymentMark key={b} brand={b} />
      ))}
    </div>
  );
}
