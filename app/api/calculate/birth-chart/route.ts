import { z } from "zod";
import { calculateThaiChart } from "@/lib/astrology/thai-chart";

const birthChartRequestSchema = z.object({
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "birthDate must be in YYYY-MM-DD format"),
  birthTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "birthTime must be in HH:MM format"),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  timezone: z.number().min(-12).max(14).default(7),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = birthChartRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { birthDate, birthTime, lat, lng, timezone } = parsed.data;

    const chart = calculateThaiChart(birthDate, birthTime, lat, lng, timezone);

    return Response.json(chart);
  } catch (error) {
    console.error("Birth chart calculation error:", error);
    return Response.json(
      {
        error: "Failed to calculate birth chart",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
