// 실습 때 사용했던 임시 api
/* fetch() 함수 사용
const BASE_URL = "https://learn.codeit.kr/api";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error("정보를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("정보를 생성하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function updateReview(id, formData) {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("정보를 수정하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteReview(id) {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("정보를 삭제하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
*/

import axios from "axios";

const BASE_URL = "https://learn.codeit.kr/apigg";

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
