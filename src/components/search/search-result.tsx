import { BookData } from "@/types";
import BookItem from "../books/book-item";
import { delay } from "@/util/delay";

export async function SearchResult({ q }: { q: string }) {
  await delay(500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) throw new Error(response.statusText);
  const searchBooks: BookData[] = await response.json();

  if (searchBooks.length === 0)
    return (
      <div>
        <h4>검색된 결과가 없습니다...😢</h4>
      </div>
    );
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
