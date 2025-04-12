import { useEffect, useState } from "react";

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);

    const totalAmount = cartData.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, []);

  // Handler to empty the cart
  const handleEmptyCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotal(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p>₹{item.price} × {item.quantity}</p>
                    <p className="text-green-700 font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right space-y-2">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <button
              onClick={handleEmptyCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Empty Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
