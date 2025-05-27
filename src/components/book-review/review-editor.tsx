"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReview } from "@/action/create-review";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(createReview, null);

  useEffect(() => {
    if (state && !state.status) alert(state.error); // 에러처리
  }, [state]);

  return (
    <section>
      <form className={style.container} action={formAction}>
        <textarea
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
          required
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            name="author"
            placeholder="작성자"
            required
          />
          <button disabled={isPending}>
            {isPending ? "작성중..." : "작성"}
          </button>
        </div>

        <input name="bookId" value={bookId} hidden readOnly />
      </form>
    </section>
  );
}
