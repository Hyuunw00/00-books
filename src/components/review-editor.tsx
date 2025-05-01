import style from "./review-editor.module.css";
import { createReview } from "@/app/action/create-review";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={style.container} action={createReview}>
        <textarea name="content" placeholder="리뷰 내용" required />
        <div className={style.submit_container}>
          <input name="author" placeholder="작성자" required />
          <button>작성</button>
        </div>

        <input name="bookId" value={bookId} hidden readOnly />
      </form>
    </section>
  );
}
