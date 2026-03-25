"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/stores/chat-store";
import { useAuthStore } from "@/stores/auth-store";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PACKAGES = [
  {
    id: "starter",
    credits: 10,
    price: 59,
    priceEn: 1.69,
    label: { th: "เริ่มต้น", en: "Starter" },
    popular: false,
  },
  {
    id: "popular",
    credits: 30,
    price: 149,
    priceEn: 4.29,
    label: { th: "ยอดนิยม", en: "Popular" },
    popular: true,
  },
  {
    id: "pro",
    credits: 100,
    price: 399,
    priceEn: 11.49,
    label: { th: "โปร", en: "Pro" },
    popular: false,
  },
] as const;

export default function PricingPage() {
  const language = useChatStore((s) => s.language);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handlePurchase(packageId: string) {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setLoadingId(packageId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl py-12 px-4">
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent mb-3"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {language === "th" ? "ซื้อเครดิต" : "Buy Credits"}
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {language === "th"
              ? "ผู้ใช้ฟรีได้ 5 ครั้ง/วัน — ซื้อเครดิตเพื่อดูดวงไม่จำกัด"
              : "Free users get 5 readings/day — buy credits for unlimited readings"}
          </p>
          <p className="text-xs text-violet-400/70 mt-2">
            {language === "th"
              ? "💜 50% ของรายได้บริจาคให้วัดและผู้ยากไร้"
              : "💜 50% of revenue donated to temples & the poor"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative border-violet-500/20 transition-all hover:border-violet-500/40 ${
                pkg.popular
                  ? "ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/10"
                  : ""
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-violet-600">
                  {language === "th" ? "แนะนำ" : "Best Value"}
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-violet-300">
                  {pkg.label[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <span className="text-4xl font-bold">{pkg.credits}</span>
                  <span className="text-muted-foreground ml-1">
                    {language === "th" ? "เครดิต" : "credits"}
                  </span>
                </div>
                <div className="text-2xl font-semibold">
                  {language === "th" ? `฿${pkg.price}` : `$${pkg.priceEn}`}
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === "th"
                    ? `฿${(pkg.price / pkg.credits).toFixed(1)}/ครั้ง`
                    : `$${(pkg.priceEn / pkg.credits).toFixed(2)}/reading`}
                </p>
                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loadingId !== null}
                  className={`w-full ${
                    pkg.popular
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                      : "bg-violet-600/20 hover:bg-violet-600/30 text-violet-300"
                  }`}
                >
                  {loadingId === pkg.id
                    ? language === "th"
                      ? "กำลังโหลด..."
                      : "Loading..."
                    : language === "th"
                      ? "ซื้อเลย"
                      : "Buy Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {!user && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            {language === "th"
              ? "ต้องเข้าสู่ระบบก่อนซื้อเครดิต — "
              : "Sign in required to purchase — "}
            <Link
              href="/auth/login"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              {language === "th" ? "เข้าสู่ระบบ" : "Sign In"}
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
