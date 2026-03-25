import type { Metadata } from "next";
import { HistoryView } from "./history-view";

export const metadata: Metadata = {
  title: "Reading History — Your Past Readings | TaThip",
  description: "View your saved fortune readings from TaThip.",
};

export default function Page() {
  return <HistoryView />;
}
