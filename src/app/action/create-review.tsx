"use server";

export async function createReview(formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();
  if (!content || !author || !bookId) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    if (!response.ok) throw Error();
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
