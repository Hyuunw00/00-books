import { SearchResult } from "@/components/search/search-result";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
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
