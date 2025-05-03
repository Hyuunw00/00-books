import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

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

async function AllBooks() {
  await delay(2000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류 발생 🚨</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

async function RandomBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류 발생 🚨</div>;
  }
  const randomBooks: BookData[] = await response.json();

  return (
    <>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

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
