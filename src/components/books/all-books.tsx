import { BookData } from "@/types";
import BookItem from "./book-item";
import { delay } from "@/util/delay";

export async function AllBooks() {
  await delay(500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) throw new Error(response.statusText);

  const allBooks: BookData[] = await response.json();

  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}
