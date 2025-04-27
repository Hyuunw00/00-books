import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// export const dynamic = "auto";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류 발생 🚨</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <section>
      <h3>등록된 모든 도서</h3>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </section>
  );
}

async function RandomBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류 발생 🚨</div>;
  }
  const randomBooks: BookData[] = await response.json();

  return (
    <section>
      <h3>지금 추천하는 도서</h3>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <RandomBooks />
      <AllBooks />
    </div>
  );
}
