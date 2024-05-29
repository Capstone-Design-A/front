const BASE_URL = "https://dev.agriculturalproducts.store";

export const getSearchItems = async (page, size, keyword, token) => {
  const SEARCH_ITEMS_ENDPOINT = "/item/search";

  try {
    const response = await fetch(
      `${SEARCH_ITEMS_ENDPOINT}?keyword=${keyword}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result.itemList;

    if (keyword) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const getAlarmCount = async (memberId) => {
  const ALARM_ITEMS_ENDPOINT = "/alarm";

  try {
    const response = await fetch(`${ALARM_ITEMS_ENDPOINT}/${memberId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        // "X-ACCESS-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result;

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const getAlarmItems = async (
  fromMember,
  keyword,
  page,
  size,
  type,
  token
) => {
  const ALARM_ITEMS_ENDPOINT = "/alarm";

  try {
    const response = await fetch(
      `${ALARM_ITEMS_ENDPOINT}?type=${type}&fromMember=${fromMember}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result.alarmList;

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const getItemsByCategory = async (categoryId, page, size, token) => {
  const ITEM_ENDPOINT = "/item";

  try {
    const response = await fetch(
      `${ITEM_ENDPOINT}?category-id=${categoryId}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    return responseData.result.itemList;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const categories = [
      { id: 1, name: "채소" },
      { id: 2, name: "과일" },
      { id: 3, name: "축산" },
      { id: 4, name: "쌀/잡곡" },
      { id: 5, name: "가공" },
      { id: 6, name: "김치" },
      { id: 7, name: "기타" },
    ];

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getGroupItems = async (page, size, keyword, token) => {
  const GROUP_ITEMS_ENDPOINT = "/groupItem";

  try {
    const response = await fetch(
      `${GROUP_ITEMS_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result.groupItemList;

    if (keyword) {
      items = items.filter((item) =>
        item.item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    items = items.map((item) => ({
      ...item.item,
      targetQuantity: item.targetQuantity,
      discountPrice: item.discountPrice,
    }));

    return items;
  } catch (error) {
    console.error("Error fetching group items:", error);
    throw error;
  }
};

export const getDeadlineItems = async (page, size, keyword, token) => {
  const DEADLINE_ITEMS_ENDPOINT = "/item/deadline";

  try {
    const response = await fetch(
      `${DEADLINE_ITEMS_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result.itemList;

    if (keyword) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const getRankingItems = async (page, size, keyword, token) => {
  const RANKING_ITEMS_ENDPOINT = "/item/ranking";

  try {
    const response = await fetch(
      `${RANKING_ITEMS_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result.itemList;

    if (keyword) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const getSubscriptionItems = async (
  fromMember,
  keyword,
  page,
  size,
  type,
  token
) => {
  const SUBSCRIPTION_ITEMS_ENDPOINT = "/item/subscription";

  try {
    const response = await fetch(
      `${SUBSCRIPTION_ITEMS_ENDPOINT}?type=${type}&fromMember=${fromMember}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let items = responseData.result.itemList;

    if (keyword) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

/*
export const getItemDetail = async (itemId, token) => {
  const ITEM_DETAIL_ENDPOINT = "/item";

  try {
    const response = await fetch(`${ITEM_DETAIL_ENDPOINT}/${itemId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-ACCESS-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const { result } = responseData;

    const imageUrls = result.imageUrl.map((image) => image.imageUrl);

    result.imageUrls = imageUrls;
    console.log("ItemDetail:", result);

    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};
*/

export const getItemDetail = async (itemId, token) => {
  const ITEM_DETAIL_ENDPOINT = "/item";

  try {
    const response = await fetch(`${ITEM_DETAIL_ENDPOINT}/${itemId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-ACCESS-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const { result } = responseData;

    const imageUrls = result.imageUrl.map((image) => image.imageUrl);

    const itemDetail = {
      id: result.id,
      memberId: result.memberId,
      name: result.name,
      category: result.category,
      stock: result.stock,
      price: result.price,
      discountPrice: result.discountPrice,
      imageUrls: imageUrls,
      deadline: result.deadline,
      itemDetailsImageUrl: result.itemDetailsImageUrl,
    };

    console.log("ItemDetail:", itemDetail);

    return itemDetail;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getGroupItemDetail = async (itemId, token) => {
  const GROUP_ITEM_DETAIL_ENDPOINT = "/groupItem";

  try {
    const response = await fetch(`${GROUP_ITEM_DETAIL_ENDPOINT}/${itemId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-ACCESS-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const { result } = responseData;

    const imageUrls = result.item.imageUrl.map((image) => image.imageUrl);

    result.imageUgrls = imageUrls;
    console.log("GroupItemDetail:", result);

    return {
      item: result.item,
      orderSum: result.orderSum,
      targetQuantity: result.targetQuantity,
      discountPrice: result.discountPrice,
    };
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getInquiryList = async (itemId, page, size, token) => {
  const INQUIRY_LIST_ENDPOINT = "/inquiry";

  try {
    const response = await fetch(
      `${INQUIRY_LIST_ENDPOINT}?itemId=${itemId}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let result = responseData.result.inquiryList;

    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getReviewList = async (itemId, page, size, token) => {
  const REVIEW_LIST_ENDPOINT = "/review";

  try {
    const response = await fetch(
      `${REVIEW_LIST_ENDPOINT}?itemId=${itemId}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    let result = responseData.result.reviewList;

    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

// 장바구니의 물건 종류 수 조회
export const getCartItems = async (memberId, token) => {
  const CART_ITEMS_ENDPOINT = "/cart";

  try {
    const response = await fetch(`${CART_ITEMS_ENDPOINT}/${memberId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-ACCESS-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result;
    console.log("CartItems:", result);
    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const addToCart = async (itemId, quantity) => {
  const ADD_TO_CART_ENDPOINT = "/auth/cart";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(ADD_TO_CART_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }

    return response.json();
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const getSellerInfo = async (memberId) => {
  const SELLER_INFO_ENDPOINT = "/intro";

  try {
    const response = await fetch(`${SELLER_INFO_ENDPOINT}/${memberId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result;
    return result;
  } catch (error) {
    console.error("Error fetching seller info:", error);
    throw error;
  }
};

export const getPostList = async (memberId) => {
  const POST_LIST_ENDPOINT = "/intro";

  try {
    const response = await fetch(`${POST_LIST_ENDPOINT}/${memberId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result;
    return result;
  } catch (error) {
    console.error("Error fetching post list:", error);
    throw error;
  }
};

export const getPostItems = async (postId, token) => {
  const POST_ITEMS_ENDPOINT = "/posts";
  try {
    const response = await fetch(`${POST_ITEMS_ENDPOINT}/${postId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-ACCESS-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const { result } = responseData;
    console.log("PostItems:", result);

    return {
      postId: result.postId,
      content: result.content,
      createdAt: result.createdAt,
      imageUrlList: result.imageUrlList,
    };
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const createPost = async (mainImage, postContent) => {
  const CREATE_POST_ENDPOINT = "/auth/posts";
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append("files", mainImage, mainImage.name);
  formData.append(
    "request",
    new Blob([JSON.stringify({ content: postContent })], {
      type: "application/json",
    })
  );

  try {
    const response = await fetch(CREATE_POST_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  const DELETE_POST_ENDPOINT = `/auth/posts/${postId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(DELETE_POST_ENDPOINT, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getDashboard = async () => {
  const DASHBOARD_ENDPOINT = "/auth/seller";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${DASHBOARD_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result;
    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getOrderStatus = async (page, size) => {
  const ORDER_STATUS_ENDPOINT = "/auth/seller/order-status";
  const token = localStorage.getItem("accessToken");
  console.log("Access token: ", token);

  try {
    const response = await fetch(
      `${ORDER_STATUS_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result.orderItemStatusList;
    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getSellerItemList = async (page, size) => {
  const SELLER_ITEM_LIST_ENDPOINT = "/auth/seller/items";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${SELLER_ITEM_LIST_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result.salesItemList;
    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getSubscriptionStatus = async (toMemberId) => {
  const SUBSCRIPTION_STATUS_ENDPOINT = `/auth/subscription/check/${toMemberId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SUBSCRIPTION_STATUS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("subscription status:", result);
    return result;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw error;
  }
};

export const subscribe = async (toMemberId) => {
  const SUBSCRIBE_ENDPOINT = `/auth/subscription/${toMemberId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SUBSCRIBE_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("subscribe:", result);
    return result;
  } catch (error) {
    console.error("Error subscribing:", error);
    throw error;
  }
};

export const unsubscribe = async (toMemberId) => {
  const SUBSCRIBE_ENDPOINT = `/auth/subscription/${toMemberId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SUBSCRIBE_ENDPOINT}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("unsubscribe:", result);
    return result;
  } catch (error) {
    console.error("Error unsubscribing:", error);
    throw error;
  }
};

/* 로그인 구현 후 구독 상태 관리 필요 시 사용
export const checkSubscription = async (fromMemberId, toMemberId) => {
  const SUBSCRIBE_ENDPOINT = `/subscription/${toMemberId}`;

  try {
    const response = await fetch(
      `${SUBSCRIBE_ENDPOINT}?from-member-id=${fromMemberId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to check subscription status");
    }
    return data;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw error;
  }
};
*/

export const login = async (loginId, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Login failed: ${errorData.message}`);
  }

  const data = await response.json();
  return data.result;
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Token refresh failed: ${errorData.message}`);
  }

  const data = await response.json();
  return data.result;
};

export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken) {
    throw new Error("Access Token이 존재하지 않습니다.");
  }

  options.headers = {
    ...options.headers,
    Authorization: `bearer ${accessToken}`,
  };

  let response = await fetch(`${BASE_URL}${url}`, options);

  if (response.status === 401) {
    const errorData = await response.json();
    if (errorData.code === "JWT_400_5") {
      try {
        const newTokens = await refreshAccessToken(refreshToken);
        localStorage.setItem("accessToken", newTokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.refreshToken);

        options.headers.Authorization = `bearer ${newTokens.accessToken}`;
        response = await fetch(`${BASE_URL}${url}`, options);
      } catch (refreshError) {
        throw new Error("토큰 갱신 실패: " + refreshError.message);
      }
    } else {
      throw new Error(errorData.message);
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export const convertToSeller = async () => {
  const CONVERT_TO_SELLER_ENDPOINT = "/auth/member/to-seller";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(CONVERT_TO_SELLER_ENDPOINT, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.isSuccess) {
      throw new Error(
        `API error! code: ${responseData.code}, message: ${responseData.message}`
      );
    }

    const result = responseData.result;
    console.log("Converted to seller: ", result);
    return result;
  } catch (error) {
    console.error("Error converting to seller:", error);
    throw error;
  }
};
