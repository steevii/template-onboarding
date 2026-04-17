import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Onboarding — ${process.env.NEXT_PUBLIC_PRODUCT_NAME ?? "Bienvenue"}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, fontFamily: "system-ui, -apple-system, sans-serif", background: "#f9fafb" }}>
        {children}
      </body>
    </html>
  );
}
