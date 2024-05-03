// const BASE_URL = "https://learn.codeit.kr/api";
/*
import axios from "axios";

const BASE_URL = "https://dev.agriculturalproducts.store";

export const getItemsByCategory = async (categoryId, page, size, token) => {
  const ITEM_ENDPOINT = "/item";
  try {
    const response = await axios.get(`${BASE_URL}${ITEM_ENDPOINT}`, {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "X-ACCESS-TOKEN": token,
      },
      params: {
        "category-id": categoryId,
        page: page,
        size: size,
      },
    });

    return response.data.result.itemList;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    // api 연결 전 카테고리 데이터 - "기타" 항목 추가
    const categories = [
      { id: 1, name: "채소" },
      { id: 2, name: "과일" },
      { id: 3, name: "축산" },
      { id: 4, name: "쌀/잡곡" },
      { id: 5, name: "가공" },
      { id: 6, name: "김치" },
    ];

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  try {
    const response = await axios.get(`${BASE_URL}/film-reviews?${query}`);
    return response.data;
  } catch (error) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
}

export async function createReview(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/film-reviews`, formData);
    return response.data;
  } catch (error) {
    throw new Error("정보를 생성하는데 실패했습니다.");
  }
}

export async function updateReview(id, formData) {
  try {
    const response = await axios.put(
      `${BASE_URL}/film-reviews/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error("정보를 수정하는데 실패했습니다.");
  }
}

export async function deleteReview(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/film-reviews/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("정보를 삭제하는데 실패했습니다.");
  }
}

*/

const BASE_URL = "https://dev.agriculturalproducts.store";

export const getItemsByCategory = async (categoryId, page, size, token) => {
  const ITEM_ENDPOINT = "/item";

  if (isNaN(categoryId)) {
    throw new Error(`Invalid categoryId: ${categoryId}`);
  }

  try {
    const response = await fetch(
      `${ITEM_ENDPOINT}?category-id=${parseInt(
        categoryId
      )}&page=${page}&size=${size}`,
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
    // api 연결 전 카테고리 데이터 - "기타" 항목 추가
    const categories = [
      { id: 1, name: "채소" },
      { id: 2, name: "과일" },
      { id: 3, name: "축산" },
      { id: 4, name: "쌀/잡곡" },
      { id: 5, name: "가공" },
      { id: 6, name: "김치" },
    ];

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getReviews = async ({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) => {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(`${BASE_URL}/film-reviews?${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
};

export const createReview = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/film-reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error("정보를 생성하는데 실패했습니다.");
  }
};

export const updateReview = async (id, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error("정보를 수정하는데 실패했습니다.");
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error("정보를 삭제하는데 실패했습니다.");
  }
};
