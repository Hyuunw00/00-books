"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();

      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    // 기본적으로 비활성화 상태
    <dialog
      onClose={(e) => router.back()} // esc
      onClick={(e) => {
        if ((e.target as HTMLElement).nodeName === "DIALOG") router.back(); // 모달 바깥 누르면 이전 경로로 이동
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("root-modal") as HTMLEmbedElement
  );
}
