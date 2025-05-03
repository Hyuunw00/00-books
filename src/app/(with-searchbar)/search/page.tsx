import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata } from "next";
import { Suspense } from "react";

// export const dynamic = "error";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `검색 결과 : ${q}`,
    description: `${q}에대한 검색 결과입니다.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `검색 결과 : ${q}`,
      description: `${q}에대한 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
  await delay(2000); //  delay

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류 발생</div>;
  const searchBooks: BookData[] = await response.json();

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q} fallback={<BookListSkeleton count={5} />}>
      <SearchResult q={q || ""}></SearchResult>
    </Suspense>
  );
}
