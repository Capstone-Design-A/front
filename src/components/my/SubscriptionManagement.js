import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubscribedSellers } from "../../api/api";
import styles from "./SubscriptionManagement.module.css";

function SubscriptionManagement() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const memberId = 1;

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersList = await getSubscribedSellers(memberId);
        setSellers(sellersList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              src={seller.imageUrl}
              alt={seller.introduction}
              className={styles.profileImage}
            />
            <p className={styles.sellerName}>{seller.introduction}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionManagement;
