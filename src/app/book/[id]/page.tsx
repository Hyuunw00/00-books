import style from "./page.module.css";
import { BookData } from "@/types";
import ReviewEditor from "@/components/book-review/review-editor";
import { Metadata } from "next";
import { BookDetails } from "@/components/book-details/book-details";
import { ReviewList } from "@/components/book-review/review-list";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) throw new Error(response.statusText);

  const book: BookData[] = await response.json();

  return book.map((el: BookData) => ({
    id: el.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const book: BookData = await response.json();

  return {
    title: `${book.title} - 혀누북스`,
    description: `${book.description}`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${book.title}`,
      description: `${book.description}`,
      images: [`${book.coverImgUrl}`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetails bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
