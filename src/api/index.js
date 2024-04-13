import mock from './mock.json';
const { products, questions } = mock;

function filterByKeyword(items, keyword) {
  const lowered = keyword.toLowerCase();
  return items.filter(({ title }) => title.toLowerCase().includes(lowered));
}

export function getProducts(keyword) {
  if (!keyword) return products;
  return filterByKeyword(products, keyword);
}

export function getProductBySlug(productSlug) {
  return products.find((product) => product.slug === productSlug);
}

export function getQuestions(keyword) {
  if (!keyword) return questions;
  return filterByKeyword(questions, keyword);
}

export function getQuestionById(questionId) {
  return questions.find((question) => question.id === questionId);
}

const WISHLIST_KEY = 'codethat-wishlist';
const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '{}');

export function addWishlist(productSlug) {
  wishlist[productSlug] = true;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function deleteWishlist(productSlug) {
  delete wishlist[productSlug];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function getWishlist() {
  return products.filter((product) => wishlist[product.slug]);
}