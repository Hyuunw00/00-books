"use client";

import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import deleteReview from "@/action/delete-review";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItem({
  id,
  author,
  content,
  createdAt,
  bookId,
}: ReviewData) {
  const [state, formAction, isPending] = useActionState(deleteReview, null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.error) alert(state.error); // 오류처리
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <section className={style.container}>
        <div className={style.author}>{author}</div>
        <div className={style.content}>{content}</div>
        <div className={style.bottom_container}>
          <div>{new Date(createdAt).toLocaleDateString()}</div>
          <input name="bookId" value={bookId} readOnly hidden />
          <input name="reviewId" value={id} readOnly hidden />
          {isPending ? (
            <div>삭제중...</div>
          ) : (
            <div
              onClick={() =>
                confirm("정말 삭제하시겠습니까?") &&
                formRef.current?.requestSubmit()
              }
              className={style.delete_btn}
            >
              삭제
            </div>
          )}
        </div>
      </section>
    </form>
  );
}
