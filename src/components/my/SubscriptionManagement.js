import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SubscriptionManagement.module.css";

const mockData = [
  { id: 1, name: "판매자1", image: "https://via.placeholder.com/150" },
  { id: 2, name: "판매자2", image: "https://via.placeholder.com/150" },
  { id: 3, name: "판매자3", image: "https://via.placeholder.com/150" },
  { id: 4, name: "판매자4", image: "https://via.placeholder.com/150" },
  { id: 5, name: "판매자5", image: "https://via.placeholder.com/150" },
  { id: 6, name: "판매자6", image: "https://via.placeholder.com/150" },
  { id: 7, name: "판매자7", image: "https://via.placeholder.com/150" },
  { id: 8, name: "판매자8", image: "https://via.placeholder.com/150" },
  { id: 9, name: "판매자9", image: "https://via.placeholder.com/150" },
  { id: 10, name: "판매자10", image: "https://via.placeholder.com/150" },
];

function SubscriptionManagement() {
  const [sellers, setSellers] = useState(mockData);

  return (
    <div className={styles.container}>
      <h2>구독 관리</h2>
      <div className={styles.sellerGrid}>
        {sellers.map((seller) => (
          <Link
            to={`/intro/${seller.id}`}
            key={seller.id}
            className={styles.sellerCard}
          >
            <img
              src={seller.image}
              alt={seller.name}
              className={styles.profileImage}
            />
            <p className={styles.sellerName}>{seller.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionManagement;
