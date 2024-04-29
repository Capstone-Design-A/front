/*
import { useState, useEffect } from "react";
import styles from "./GroupPurchase.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getGroupPurchaseItemsPreview } from "../../api"; // api 파일의 경로에 따라 수정해주세요
import GroupItem from "./GroupItem"; // GroupItem 컴포넌트의 경로에 따라 수정해주세요

SwipeCore.use([Navigation, Pagination, Autoplay]);

function GroupPurchase() {
  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroupPurchaseItemsPreview();
        setGroupItems(data.items);
      } catch (error) {
        console.error("Error fetching group purchase items:", error);
      }
    }
    fetchData();
  }, []);

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
        {groupItems.map((item) => (
          <SwiperSlide key={item.id}>
            <GroupItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default GroupPurchase;
*/

import { useState, useEffect } from "react";
import styles from "./GroupPurchase.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getGroupPurchaseItemsPreview } from "../../api"; // api 파일의 경로에 따라 수정해주세요
import GroupItem from "./GroupItem"; // GroupItem 컴포넌트의 경로에 따라 수정해주세요

SwipeCore.use([Navigation, Pagination, Autoplay]);

function GroupPurchase() {
  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroupPurchaseItemsPreview();
        // targetQuantity가 적은 순서대로 정렬
        const sortedItems = data.items.sort(
          (a, b) => a.targetQuantity - b.targetQuantity
        );
        // 상위 5개의 아이템만 선택
        const top5Items = sortedItems.slice(0, 5);
        setGroupItems(top5Items);
      } catch (error) {
        console.error("Error fetching group purchase items:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Swiper
          className={styles.banner}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {groupItems.map((item) => (
            <SwiperSlide key={item.id}>
              <GroupItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default GroupPurchase;
