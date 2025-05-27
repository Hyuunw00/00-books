import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { ReactNode } from "react";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 NooBooks</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="root-modal" />
      </body>
    </html>
  );
}
