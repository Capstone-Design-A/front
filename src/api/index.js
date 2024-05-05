import mock from "./mock.json";
const {
  products,
  groupPurchaseItemsPreview,
  deadlineItemsPreview,
  subscriptionSellerItemsPreview,
  purchaseRankingItemsPreview,
  questions,
  reviews,
} = mock;

function filterByKeyword(items, keyword) {
  const lowered = keyword.toLowerCase();
  return items.filter(({ title }) => title.toLowerCase().includes(lowered));
}

export function getProducts(keyword) {
  if (!keyword) return products;
  return filterByKeyword(products, keyword);
}

export function getProductBySlug(productSlug) {
  return products.find((product) => product.id === productSlug);
}

/*
export function getGroupPurchaseItemsPreview(keyword) {
  if (!keyword) return groupPurchaseItemsPreview;
  return filterByKeyword(groupPurchaseItemsPreview, keyword);
}
*/
export function getGroupPurchaseItemsPreview(keyword) {
  if (!keyword) return groupPurchaseItemsPreview;
  const filteredItems = groupPurchaseItemsPreview.items.filter((item) =>
    item.name.includes(keyword)
  );
  return { ...groupPurchaseItemsPreview, items: filteredItems };
}

/*
export function getGroupPurchaseItemsPreviewBySlug(productSlug) {
  return groupPurchaseItemsPreview.find(
    (product) => product.id === productSlug
  );
}

export function getDeadlineItemsPreview(keyword) {
  if (!keyword) return deadlineItemsPreview;
  return filterByKeyword(deadlineItemsPreview, keyword);
}

export function getdeadlineItemsPreviewBySlug(productSlug) {
  return deadlineItemsPreview.find((product) => product.id === productSlug);
}
*/

export function getSubscriptionSellerItemsPreview(keyword) {
  if (!keyword) return subscriptionSellerItemsPreview;
  return filterByKeyword(subscriptionSellerItemsPreview, keyword);
}

export function getSubscriptionSellerItemsPreviewBySlug(productSlug) {
  return subscriptionSellerItemsPreview.find(
    (product) => product.id === productSlug
  );
}

export function getPurchaseRankingItemsPreview(keyword) {
  if (!keyword) return purchaseRankingItemsPreview;
  return filterByKeyword(purchaseRankingItemsPreview, keyword);
}

export function getPurchaseRankingItemsPreviewBySlug(productSlug) {
  return purchaseRankingItemsPreview.find(
    (product) => product.id === productSlug
  );
}

/*
export function getCategories(keyword) {
  if (!keyword) return categories;
  return filterByKeyword(categories, keyword);
}

export function getCategoryBySlug(categorySlug) {
  return categories.find((category) => category.slug === categorySlug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter((product) => product.category === categorySlug);
}
*/

export function getQuestions(keyword) {
  if (!keyword) return questions;
  return filterByKeyword(questions, keyword);
}

export function getQuestionById(questionId) {
  return questions.find((question) => question.id === questionId);
}

export function getReviews(keyword) {
  if (!keyword) return reviews;
  return filterByKeyword(reviews, keyword);
}

export function getReviewById(reviewId) {
  return reviews.find((review) => review.id === reviewId);
}

const WISHLIST_KEY = "codethat-wishlist";
const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "{}");

export function addWishlist(productSlug) {
  wishlist[productSlug] = true;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function deleteWishlist(productSlug) {
  delete wishlist[productSlug];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function getWishlist() {
  return products.filter((product) => wishlist[product.id]);
}
