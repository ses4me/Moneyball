import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
title: "MoneyBall | The 5% Charity Rule Tracker",
description: "Tracking the 5% Mandate. MoneyBall identifies private foundations hoarding wealth instead of spending the legal 5% minimum on charity.",
keywords: ["5 percent rule", "IRS 990-PF tracker", "charity spending rate", "investors", "Funding", "Innovators", "charities", "Aarush Jain", "Zombie Foundations"],
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<body>
{children}
<Analytics />
<SpeedInsights />
</body>
</html>
);
}
