import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  image: string;
  price: number;
}

interface Category {
  name: string;
  products: Product[];
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get-categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {categories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        categories.map((category) => (
          <div key={category.name} className="mb-6">
            <h2
              className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate(`/categories/${encodeURIComponent(category.name)}`)}
            >
              {category.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
              {category.products.map((product) => (
                <div
                  key={product.name}
                  className="border p-4 rounded-lg shadow hover:shadow-md transition duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="mt-2 font-medium">{product.name}</p>
                  <p className="text-green-600 font-semibold">₹{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
