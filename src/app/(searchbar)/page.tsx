import style from "./page.module.css";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";
import { RandomBooks } from "@/components/books/random-books";
import { AllBooks } from "@/components/books/all-books";

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "혀누 북스",
  description: "혀누 북스는 책을 소개하는 웹 사이트입니다.",
  keywords: ["책", "개발", "소개", "IT", "웹 개발"],
  authors: {
    name: "현우",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "혀누 북스",
    description: "혀누 북스는 책을 소개하는 웹 사이트입니다.",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RandomBooks />
        </Suspense>
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
