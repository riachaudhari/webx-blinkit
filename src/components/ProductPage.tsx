import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const ProductsPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/categories/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [categoryName]);

  const increaseQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  const decreaseQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max((prev[index] || 0) - 1, 0),
    }));
  };

  const updateCart = (index: number) => {
    const quantity = quantities[index] || 0;
    const product = products[index];

    let existingCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = existingCart.findIndex((item) => item.name === product.name);

    if (quantity === 0) {
      if (existingIndex >= 0) {
        existingCart.splice(existingIndex, 1);
      }
    } else {
      if (existingIndex >= 0) {
        existingCart[existingIndex].quantity = quantity;
      } else {
        existingCart.push({ ...product, quantity });
      }
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Cart updated");
  };

  return (
    <div className="p-6">
      {/* Top bar with category title and View Cart button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {decodeURIComponent(categoryName || "")}
        </h1>
        <button
          onClick={() => navigate("/cart")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          View Cart
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded mb-2">
  <img
    src={product.image}
    alt={product.name}
    className="h-full object-contain"
  />
</div>

              <div className="mt-2">
                <h4 className="text-lg font-medium">{product.name}</h4>
                <p className="text-green-600 font-semibold mb-2">₹{product.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="bg-gray-300 text-black px-2 rounded"
                  >
                    -
                  </button>
                  <span>{quantities[index] || 0}</span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="bg-green-700 text-white px-2 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => updateCart(index)}
                  className="mt-3 bg-green-700 text-white py-1 px-3 rounded w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
