import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function AllBooks() {
  await delay(3000);

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
      <Suspense fallback={<div>책 불러오는중...</div>}>
        <section>
          <h3>지금 추천하는 도서</h3>
          <RandomBooks />
        </section>
      </Suspense>

      <Suspense fallback={<div>책 불러오는중...</div>}>
        <section>
          <h3>모든 도서</h3>
          <AllBooks />
        </section>
      </Suspense>
    </div>
  );
}
