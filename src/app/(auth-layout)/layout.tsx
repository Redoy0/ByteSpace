/** Full-screen sign-in / sign-up pages: no site navbar or footer. */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" className="bg-bs-grid">
      {children}
    </main>
  );
}
