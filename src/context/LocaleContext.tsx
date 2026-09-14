"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Locale } from "@/config/translations";

type Currency = "BRL" | "USD";

interface LocaleContextType {
  locale: Locale;
  currency: Currency;
  exchangeRate: number;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  t: (key: string) => string;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined,
);

const DEFAULT_EXCHANGE_RATE = 5.0;
const EXCHANGE_RATE_TTL_MS = 60 * 60 * 1000;

function getFromPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as never)[key] : undefined,
      obj,
    );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");
  const [currency, setCurrencyState] = useState<Currency>("BRL");
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_EXCHANGE_RATE);

  useEffect(() => {
    const storedLocale = localStorage.getItem("preferredLocale") as Locale | null;
    const storedCurrency = localStorage.getItem(
      "preferredCurrency",
    ) as Currency | null;

    if (storedLocale && storedCurrency) {
      setLocaleState(storedLocale);
      setCurrencyState(storedCurrency);
      return;
    }

    const applyDetected = (detectedLocale: Locale, detectedCurrency: Currency) => {
      setLocaleState(detectedLocale);
      setCurrencyState(detectedCurrency);
      localStorage.setItem("preferredLocale", detectedLocale);
      localStorage.setItem("preferredCurrency", detectedCurrency);
    };

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data: { country_code?: string }) => {
        if (data.country_code === "BR") {
          applyDetected("pt-BR", "BRL");
        } else {
          applyDetected("en-US", "USD");
        }
      })
      .catch(() => {
        applyDetected("pt-BR", "BRL");
      });
  }, []);

  useEffect(() => {
    const cachedRate = localStorage.getItem("exchangeRateBRL");
    const cachedAt = Number(localStorage.getItem("exchangeRateUpdatedAt") ?? 0);

    if (cachedRate && Date.now() - cachedAt < EXCHANGE_RATE_TTL_MS) {
      setExchangeRate(Number(cachedRate));
      return;
    }

    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data: { rates?: { BRL?: number } }) => {
        const rate = data.rates?.BRL;
        if (rate) {
          setExchangeRate(rate);
          localStorage.setItem("exchangeRateBRL", String(rate));
          localStorage.setItem("exchangeRateUpdatedAt", String(Date.now()));
        }
      })
      .catch(() => {
        if (cachedRate) setExchangeRate(Number(cachedRate));
      });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("preferredLocale", next);
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    localStorage.setItem("preferredCurrency", next);
  }, []);

  const formatPrice = useCallback(
    (priceInUSD: number) => {
      if (currency === "USD") {
        return `$${priceInUSD.toLocaleString("en-US")}`;
      }
      const priceInBRL = Math.round(priceInUSD * exchangeRate);
      return `R$ ${priceInBRL.toLocaleString("pt-BR")}`;
    },
    [currency, exchangeRate],
  );

  const t = useCallback(
    (key: string) => {
      const value = getFromPath(translations[locale], key);
      return typeof value === "string" ? value : key;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, currency, exchangeRate, setLocale, setCurrency, formatPrice, t }),
    [locale, currency, exchangeRate, setLocale, setCurrency, formatPrice, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
