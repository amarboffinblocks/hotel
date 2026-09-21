import { SiteFooter } from "@/components/marketing/layout/site-footer";
import { SiteHeader } from "@/components/marketing/layout/site-header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
