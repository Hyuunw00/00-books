"use server";

import { delay } from "@/util/delay";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createReview(_: any, formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();
  if (!content || !author || !bookId) {
    return { status: false, error: "모두 입력해주세요!" };
  }

  try {
    // await delay(1500);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    if (!response.ok) throw Error(response.statusText);
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);
    return { status: false, error: "리뷰 생성에 실패했습니다." };
  }
}
