/**
 * JSON-LD structured data for SEO.
 * Renders a <script type="application/ld+json"> tag.
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** WebApplication schema for TaThip */
export function TaThipJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "TaThip — AI Fortune Teller",
        url: "https://tathip.com",
        description:
          "AI-powered fortune telling combining Thai astrology, Tarot, Numerology, and Chinese BaZi.",
        applicationCategory: "Entertainment",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "THB",
          description: "5 free readings per day",
        },
        inLanguage: ["th", "en"],
      }}
    />
  );
}

/** FAQPage schema generator */
export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
