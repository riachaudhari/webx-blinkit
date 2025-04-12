import { useEffect, useState } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
}

interface Category {
  name: string;
  products: Product[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      {categories.map((category) => (
        <div key={category.name} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.products.map((product, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                <div className="w-full h-40 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                  <p className="text-gray-700 font-semibold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
