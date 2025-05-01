import { ReviewData } from "@/types";
import style from "./review-item.module.css";

export default function ReviewItem({
  id,
  author,
  content,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <section className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div>{new Date(createdAt).toLocaleDateString()}</div>
        <div className={style.delete_btn}>삭제</div>
      </div>
    </section>
  );
}
