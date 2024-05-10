import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import styles from "./ManagementHeader.module.css";
import img1 from "../../assets/managementHeader1.png";
import img2 from "../../assets/managementHeader2.png";
import img3 from "../../assets/managementHeader3.png";
import img4 from "../../assets/managementHeader4.png";

function ManagementHeader() {
  const datas = [
    {
      imgSrc: img1,
      title: "오늘의 판매량",
      price: "75,500",
      percentage: "+ 10%",
    },
    {
      imgSrc: img2,
      title: "어제의 판매량",
      price: "50,100",
      percentage: "+ 0%",
    },
    {
      imgSrc: img3,
      title: "이번달 판매량",
      price: "315,000",
      percentage: "+ 15%",
    },
    {
      imgSrc: img4,
      title: "주문 현황",
      price: "+ 2",
      percentage: "- 25%",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        {datas.map((data, index) => (
          <Card key={index} className={styles.item}>
            <div className={styles.img}>
              <img src={data.imgSrc} alt="" />
            </div>
            <div className={styles.text}>
              <Link to="/">
                <h2 className={styles.title}>{data.title}</h2>
              </Link>
              <div className={styles.price}>
                {data.price}{" "}
                <span className={styles.percentage}>{data.percentage}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ManagementHeader;
