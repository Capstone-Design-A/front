// 공동구매 Item을 슬라이드 배너로 보여준다
// Swiper 라이브러리를 사용해 Carousel 구현
// 임의로 같은 데이터 4개를 보여주고 있는 상태
import GroupItem from "./GroupItem";
import styles from "./GroupPurchase.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwipeCore.use([Navigation, Pagination, Autoplay]);

function GroupPurchase() {
  return (
    <>
      <Swiper
        className={styles.banner}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <GroupItem />
        </SwiperSlide>
        <SwiperSlide>
          <GroupItem />
        </SwiperSlide>
        <SwiperSlide>
          <GroupItem />
        </SwiperSlide>
        <SwiperSlide>
          <GroupItem />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default GroupPurchase;
