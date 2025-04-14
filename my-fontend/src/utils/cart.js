// utils/cart.js

const CART_KEY = "cart";

// Lấy cart từ localStorage
export function getCart() {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

// Lưu cart vào localStorage
export function saveCart(cart) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

// Thêm sản phẩm vào giỏ
export function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const index = cart.findIndex(item => item.productId === productId);

  if (index !== -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(cart);
}

// Xóa sản phẩm khỏi giỏ
export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
}

// Cập nhật số lượng
export function updateQuantity(productId, quantity) {
  const cart = getCart().map(item =>
    item.productId === productId ? { ...item, quantity } : item
  );
  saveCart(cart);
}
