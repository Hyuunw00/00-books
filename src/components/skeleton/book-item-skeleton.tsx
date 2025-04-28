import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./book-item-skeleton.module.css";

export default function BookItemSkeleton() {
  return (
    // <div className={style.container}>
    //   <div className={style.coverImg}></div>
    //   <div className={style.info_container}>
    //     <div className={style.title}></div>
    //     <div className={style.subtitle}></div>
    //     <br />
    //     <div className={style.author}></div>
    //   </div>
    // </div>

    // 라이브러리 활용
    <div className={style.container}>
      <Skeleton className={style.coverImg}></Skeleton>
      <div className={style.info_container}>
        <Skeleton className={style.title}></Skeleton>
        <Skeleton className={style.subtitle}></Skeleton>
        <br />
        <Skeleton className={style.author}></Skeleton>
      </div>
    </div>
  );
}
