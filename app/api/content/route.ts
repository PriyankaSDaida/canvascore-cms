import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    data: [
      {
        id: "future-travel",
        title: "Future of sustainable travel",
        model: "landingPage",
        status: "in_review",
        locale: "en-US",
      },
      {
        id: "spring-destinations",
        title: "Spring destinations campaign",
        model: "campaign",
        status: "draft",
        locale: "en-US",
      },
    ],
    meta: { total: 248, environment: "development" },
  });
}
