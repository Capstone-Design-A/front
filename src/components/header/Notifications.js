// 알림창 컴포넌트
// 삭제 기능은 구체화 필요
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAlarmCount } from "../../api/api";
import styles from "./Notifications.module.css";
import NotificationItem from "../notification/NotificationItem";
import notificationIcon from "../../assets/notificationIcon.png";
import notificationIconClick from "../../assets/notificationIconClick.png";

// mock 데이터
const notificationData = [
  {
    id: 1,
    postId: 123,
    profileImage: "profileImage1",
    content: "구독하신 A님의 새로운 게시물: 게시물 제목",
    postImage: "postImage1",
    time: "방금 전",
  },
  {
    id: 2,
    postId: 456,
    profileImage: "profileImage2",
    content: "구독하신 B님의 새로운 게시물: 게시물 제목",
    postImage: "postImage2",
    time: "10분 전",
  },
  {
    id: 3,
    postId: 789,
    profileImage: "profileImage3",
    content: "구독하신 C님의 새로운 게시물: 게시물 제목",
    postImage: "postImage3",
    time: "16시간 전",
  },
];

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationData);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [iconSrc, setIconSrc] = useState(notificationIcon);
  const memberId = 2;
  // const token = "JWT-TOKEN";

  const fetchUnreadCount = useCallback(async () => {
    try {
      const unreadCount = await getAlarmCount(memberId);
      setNotificationCount(unreadCount);
    } catch (error) {
      console.error("Error fetching unread alarms count: ", error);
    }
  }, [memberId]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      setIsOpen((prevIsOpen) => !prevIsOpen);
      if (notificationCount > 0) {
        setNotificationCount(0);
      }
      if (!isOpen) {
        setIconSrc(notificationIconClick);
      } else {
        setIconSrc(notificationIcon);
      }
    },
    [notificationCount, isOpen]
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
            onClick={handleButtonClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
                profileImage={notification.profileImage}
                content={notification.content}
                time={notification.time}
                postImage={notification.postImage}
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
