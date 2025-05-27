import { BookData } from "@/types";
import BookItem from "./book-item";
import { delay } from "@/util/delay";

export async function RandomBooks() {
  await delay(500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) throw new Error(response.statusText);

  const randomBooks: BookData[] = await response.json();

  return (
    <>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}
