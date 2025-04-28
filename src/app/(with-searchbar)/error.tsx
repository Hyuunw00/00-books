"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div>
      <h3>오류 발생 🚨</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러온다.
            reset(); // 에러 상태 초기화, 컴포넌트를 다시 랜더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
