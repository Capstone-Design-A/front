import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../api/api";
import Card from "../components/shared/Card";
import styles from "./DashboardPage.module.css";
import img1 from "../assets/managementHeader1.png";
import img2 from "../assets/managementHeader2.png";
import img3 from "../assets/managementHeader3.png";
import img4 from "../assets/managementHeader4.png";

function DashboardPage() {
  const [datas, setDatas] = useState({});
  const sellerId = localStorage.getItem("memberId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboard = await getDashboard(sellerId);
        setDatas(dashboard);
      } catch (error) {
        console.error("Error fetching dashboard list: ", error);
      }
    };

    fetchData();
  }, [sellerId]);

  const cardsInfo = [
    {
      img: img1,
      title: "오늘의 판매량",
      value: datas.todaySalesVolume,
      percentage: datas.todaySalesVolumePercent,
    },
    {
      img: img2,
      title: "어제의 판매량",
      value: datas.dayBeforeSalesVolume,
      percentage: datas.todaySalesVolumePercent, // 추후 변경
    },
    {
      img: img3,
      title: "이번달 판매량",
      value: datas.monthSalesVolume,
      percentage: datas.monthSalesVolumePercent,
    },
    {
      img: img4,
      title: "주문 현황",
      value: datas.orderStatusNumber,
      percentage: datas.monthSalesVolumePercent,
    },
  ];

  return (
    <div className={styles.container}>
      {cardsInfo.map((card, index) => (
        <Card key={index} className={styles.item}>
          <div className={styles.img}>
            <img src={card.img} alt={card.title} />
          </div>
          <div className={styles.text}>
            <Link to="/">
              <h2 className={styles.title}>{card.title}</h2>
            </Link>
            <div className={styles.price}>
              {card.value?.toLocaleString()}{" "}
              <span className={styles.percentage}>{card.percentage}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default DashboardPage;
