/**
 * Full-screen sign-in / sign-up pages on the blue grid — no site navbar or
 * footer. The grid rows start 2px up, as in ui/Login.png.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" className="bg-bs-grid [--grid-y:-2px]">
      {children}
    </main>
  );
}
