export async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) return <footer>제작 by. hyunw00</footer>;

  const allBooks = await response.json();
  const bookCOunt = allBooks.length;

  return (
    <footer>
      <div>제작 by. hyunw00</div>
      <div>{bookCOunt}개의 도서가 등록되었습니다.</div>
    </footer>
  );
}
