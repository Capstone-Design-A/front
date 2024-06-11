import React, { useState, useEffect } from "react";
import styles from "./GroupPurchase.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getGroupItems } from "../../api/api.js";
import GroupPurchaseItem from "./GroupPurchaseItem";

SwipeCore.use([Navigation, Pagination, Autoplay]);

function GroupPurchase() {
  const [groupPurchaseItems, setGroupPurchaseItems] = useState([]);
  // eslint-disable-next-line
  const [totalElement, setTotalElement] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getGroupItems(1, pageSize, null, "JWT_TOKEN");

        setTotalElement(data.totalElement);

        const sortedItems = data.items.sort(
          (a, b) => a.targetQuantity - b.targetQuantity
        );
        const top5Items = sortedItems.slice(0, pageSize);
        setGroupPurchaseItems(top5Items);
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
          {groupPurchaseItems.map((item) => (
            <SwiperSlide key={item.id}>
              <GroupPurchaseItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default GroupPurchase;
