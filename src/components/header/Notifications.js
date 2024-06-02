import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAlarmCount, getAlarmItems } from "../../api/api";
import styles from "./Notifications.module.css";
import NotificationItem from "../notification/NotificationItem";
import notificationIcon from "../../assets/notificationIcon.png";
import notificationIconClick from "../../assets/notificationIconClick.png";

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [iconSrc, setIconSrc] = useState(notificationIcon);
  const memberId = 2;

  const fetchUnreadCount = useCallback(async () => {
    try {
      const unreadCount = await getAlarmCount(memberId);
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error("Error fetching unread alarms count: ", error);
    }
  }, [memberId]);

  const fetchNotifications = useCallback(async () => {
    try {
      const alarmItems = await getAlarmItems(1, 10, 0, memberId);
      setNotifications(alarmItems);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  }, [memberId]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications]);

  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      setIsOpen((prevIsOpen) => !prevIsOpen);
      if (!isOpen) {
        setIconSrc(notificationIconClick);
      } else {
        setIconSrc(notificationIcon);
      }
    },
    [isOpen]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.length);
  };

  return (
    <div className={styles.notification}>
      <button
        className={styles.icon}
        onClick={handleButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.iconContainer}>
          <img
            src={iconSrc}
            alt="알림 아이콘"
            className={isHovered ? styles.iconHovered : styles.icon}
          />
          {notificationCount > 0 && (
            <div className={styles.notificationCount}>{notificationCount}</div>
          )}
        </div>
      </button>
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.notificationHeader}>알림</div>
          <div className={styles.notificationList}>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                title={notification.title}
                content={notification.content}
                isConfirmed={notification.isConfirmed}
                onDelete={() => handleDeleteNotification(notification.id)}
              />
            ))}
          </div>
          <Link to="/cart" className={styles.notificationLink}>
            알림 전체 보기
          </Link>
        </div>
      )}
    </div>
  );
}

export default Notifications;
