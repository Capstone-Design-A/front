const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
const URL = `${PROXY}`;
const BASE_URL = URL;

// 메인 섹션
export const getSearchItems = async (page, size, keyword, token) => {
  const SEARCH_ITEMS_ENDPOINT = "/item/search";

  try {
    const response = await fetch(
      `${SEARCH_ITEMS_ENDPOINT}?keyword=${keyword}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
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
    console.error("Error fetching search items:", error);
    throw error;
  }
};

export const getAlarmCount = async () => {
  const ALARM_COUNT_ENDPOINT = "/auth/alarm";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${ALARM_COUNT_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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

    let items = responseData.result;

    return items;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const getAlarmItems = async (page, size, type, memberId) => {
  const ALARM_ITEMS_ENDPOINT = "/auth/alarms";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${ALARM_ITEMS_ENDPOINT}?type=${type}&memberId=${memberId}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
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
          Accept: "application/json",
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

export const getGroupItems = async (page, size, keyword, token) => {
  const GROUP_ITEMS_ENDPOINT = "/groupItem";

  try {
    const response = await fetch(
      `${GROUP_ITEMS_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
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

    const items = responseData.result.groupItemList || [];

    if (keyword) {
      return items.filter((groupItem) =>
        groupItem.item?.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    return items
      .map((groupItem) => ({
        id: groupItem.id,
        name: groupItem.item?.name,
        category: groupItem.item?.category,
        stock: groupItem.item?.stock,
        price: groupItem.item?.price,
        discountPrice: groupItem.discountPrice,
        imageUrl: groupItem.item?.imageUrl,
        deadline: groupItem.item?.deadline,
        targetQuantity: groupItem.targetQuantity,
      }))
      .filter((item) => item.name);
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
          Accept: "application/json",
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
          Accept: "application/json",
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
  page,
  size,
  type,
  fromMember = null
) => {
  const SUBSCRIPTION_ITEMS_ENDPOINT = "/item/subscription";
  const token = localStorage.getItem("accessToken");

  try {
    let url = `${window.location.origin}${SUBSCRIPTION_ITEMS_ENDPOINT}?type=${type}&page=${page}&size=${size}`;

    if (type === 0 && fromMember) {
      url += `&fromMember=${fromMember}`;
    }

    const headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
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

    return {
      itemList: responseData.result.itemList,
      totalElement: responseData.result.totalElement,
    };
  } catch (error) {
    console.error("Error fetching subscription items:", error);
    throw error;
  }
};

export const getItemDetail = async (itemId, token) => {
  const ITEM_DETAIL_ENDPOINT = "/item";

  try {
    const response = await fetch(`${ITEM_DETAIL_ENDPOINT}/${itemId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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

    const imageUrls = Array.isArray(result.imageUrl)
      ? result.imageUrl.map((image) => image.imageUrl)
      : [];

    const item = {
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

    console.log("ItemDetail:", item);

    return item;
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
        Accept: "application/json",
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

    const imageUrls = Array.isArray(result.item.imageUrl)
      ? result.item.imageUrl.map((image) => image.imageUrl)
      : [];

    const item = {
      id: result.item.id,
      memberId: result.item.memberId,
      name: result.item.name,
      category: result.item.category,
      stock: result.item.stock,
      price: result.item.price,
      discountPrice: result.discountPrice,
      imageUrls: imageUrls,
      deadline: result.deadline,
      itemDetailsImageUrl: result.item.itemDetailsImageUrl,
      targetQuantity: result.targetQuantity,
    };

    return item;
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
          Accept: "application/json",
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

export const postInquiry = async (itemId, content) => {
  const POST_INQUIRY_ENDPOINT = "/auth/inquiry";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(POST_INQUIRY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId, content }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error post inquiry:", error);
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
          Accept: "application/json",
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

export const countCartItems = async (memberId) => {
  const CART_ITEMS_ENDPOINT = "/auth/cart";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${CART_ITEMS_ENDPOINT}/${memberId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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

export const addToCart = async (itemId, quantity) => {
  const ADD_TO_CART_ENDPOINT = "/auth/cart";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(ADD_TO_CART_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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

export const getCartItems = async () => {
  const CART_ITEMS_ENDPOINT = "/auth/cart/item";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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

    return responseData;
  } catch (error) {
    console.error("Error fetching deadline items:", error);
    throw error;
  }
};

export const deleteCartItems = async (cartId) => {
  const DELETE_CART_ITEMS_ENDPOINT = `/auth/cart/${cartId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(DELETE_CART_ITEMS_ENDPOINT, {
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

export const fakePayment = async (orderData) => {
  const FAKE_PAYMENT_ENDPOINT = `/auth/payment`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(FAKE_PAYMENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to make payment");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
};

// 판매자 소개 섹션
export const getSellerInfo = async (memberId) => {
  const SELLER_INFO_ENDPOINT = "/intro";

  try {
    const response = await fetch(`${SELLER_INFO_ENDPOINT}/${memberId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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
        Accept: "application/json",
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
        Accept: "application/json",
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

export const subscribe = async (toMemberId) => {
  const SUBSCRIBE_ENDPOINT = `/auth/subscription/${toMemberId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SUBSCRIBE_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
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
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error unsubscribing:", error);
    throw error;
  }
};

// 판매자 관리 섹션
export const getDashboard = async () => {
  const DASHBOARD_ENDPOINT = "/auth/seller";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${DASHBOARD_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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
          Accept: "application/json",
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

    return responseData.result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const getSellerImminentItemList = async (page, size) => {
  const SELLER_ITEM_LIST_ENDPOINT = "/auth/seller/imminent-item";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${SELLER_ITEM_LIST_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
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

    const result = responseData.result;
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
          Accept: "application/json",
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

    const result = responseData.result;
    return result;
  } catch (error) {
    console.error("Error fetching item detail:", error);
    throw error;
  }
};

export const registerItem = async (
  itemName,
  simpleExplanation,
  categoryId,
  price,
  stock,
  deliveryPrice,
  deadLine,
  isGroupPurchase,
  targetQuantity,
  groupPurchasePrice,
  itemImages,
  itemDetailsImage
) => {
  const REGISTER_ITEM_ENDPOINT = "/auth/item";
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append("itemImages", itemImages, itemImages.name);
  formData.append("itemDetailsImage", itemDetailsImage, itemDetailsImage.name);

  const requestObject = {
    itemName: itemName,
    simpleExplanation: simpleExplanation,
    categoryId: categoryId,
    price: price,
    stock: stock,
    deliveryPrice: deliveryPrice,
    deadLine: deadLine,
    isGroupPurchase: isGroupPurchase,
    targetQuantity: targetQuantity,
    groupPurchasePrice: groupPurchasePrice,
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(requestObject)], { type: "application/json" })
  );

  try {
    const response = await fetch(REGISTER_ITEM_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to register item");
    }

    return response.json();
  } catch (error) {
    console.error("Error registering item:", error);
    throw error;
  }
};

// 소비자 개인 섹션
export const getSubscriptionStatus = async (toMemberId) => {
  const SUBSCRIPTION_STATUS_ENDPOINT = `/auth/subscription/check/${toMemberId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${SUBSCRIPTION_STATUS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw error;
  }
};

export const getUserOrderStatus = async (orderId) => {
  const ORDER_STATUS_ENDPOINT = `/auth/member/order/${orderId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${ORDER_STATUS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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
    console.error("Error fetching order status:", error);
    throw error;
  }
};

export const getUserGroupStatus = async (page, size) => {
  const ORDER_GROUP_ITEMS_ENDPOINT = "/auth/orderGroupItems";
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${ORDER_GROUP_ITEMS_ENDPOINT}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
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

    const orderGroupItems = responseData.result.orderGroupItemList;
    return orderGroupItems;
  } catch (error) {
    console.error("Error fetching order group items:", error);
    throw error;
  }
};

// auth
export const login = async (loginId, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
      Accept: "application/json",
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

export const convertToSeller = async (profileImage, introduction) => {
  const CONVERT_TO_SELLER_ENDPOINT = "/auth/member/to-seller";
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append("multipartFile", profileImage);
  formData.append(
    "request",
    new Blob([JSON.stringify(introduction)], {
      type: "application/json",
    })
  );

  try {
    const response = await fetch(CONVERT_TO_SELLER_ENDPOINT, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export const signUp = async (
  id,
  loginId,
  password,
  name,
  nickName,
  phone,
  address,
  details
) => {
  const SIGN_UP_ENDPOINT = "/member/signUp";

  try {
    const response = await fetch(SIGN_UP_ENDPOINT, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
        loginId,
        password,
        name,
        nickName,
        phone,
        address,
        details,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

export const checkDuplicate = async (id, type, value) => {
  const CHECK_DUPLICATE_ENDPOINT = "/member/dupCheck";

  try {
    const response = await fetch(CHECK_DUPLICATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
        type,
        [type]: value,
      }),
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error checking duplicate:", error);
    return false;
  }
};

export const removeMember = async (memberId) => {
  const REMOVE_MEMBER_ENDPOINT = `/tempMember/${memberId}`;

  try {
    const response = await fetch(`${REMOVE_MEMBER_ENDPOINT}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.isSuccess) {
      console.log("Member removed successfully:", data);
    } else {
      console.error("Failed to remove member:", data.message);
    }
  } catch (error) {
    console.error("Error removing member:", error);
  }
};

export const getSubscribedSellers = async (memberId, page = 1, size = 10) => {
  const SUBSCRIBED_SELLERS_ENDPOINT = `/auth/subscribedSeller`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${SUBSCRIBED_SELLERS_ENDPOINT}?memberId=${memberId}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
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

    return responseData.result.sellerList;
  } catch (error) {
    console.error("Error fetching subscribed sellers:", error);
    throw error;
  }
};

// api.js

export const fetchUserInfo = async () => {
  const FETCH_USER_INFO_ENDPOINT = `/auth/member`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(FETCH_USER_INFO_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserInfo = async (updatedData) => {
  const UPDATE_USER_INFO_ENDPOINT = `/auth/member`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(UPDATE_USER_INFO_ENDPOINT, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
