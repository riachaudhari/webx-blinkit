import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

// Interfaces
interface Category {
  name: string;
  image: string;
}

interface InfoCard {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

// Info Cards Data
const infoCards: InfoCard[] = [
  {
    title: "Pharmacy at your doorstep!",
    description: "Cough syrups, pain relief sprays & more",
    image: "images/pharmacy.jpeg",
    buttonText: "Order Now",
  },
  {
    title: "Pet Care supplies in minutes",
    description: "Food, treats, toys & more",
    image: "images/petcare.jpeg",
    buttonText: "Order Now",
  },
  {
    title: "No time for a diaper run?",
    description: "Get baby care essentials in minutes",
    image: "images/baby.jpg",
    buttonText: "Order Now",
  },
];

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Image Only */}
      <div className="w-full">
        <img
          src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg"
          alt="Paan Corner"
          className="w-full h-48 md:h-64 object-cover"
        />
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {/* Info Cards */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {infoCards.map((card, index) => (
  <div
    key={index}
    className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition text-center"
  >
    <div className="w-full h-36 flex items-center justify-center bg-gray-100 rounded mb-3">
      <img
        src={card.image}
        alt={card.title}
        className="h-full object-contain"
      />
    </div>
    <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
    <p className="text-gray-600 text-sm mb-3">{card.description}</p>
    <button className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition">
      {card.buttonText}
    </button>
  </div>
))}

        </div>

        {/* Categories */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shop by Category</h2>
{loading ? (
  <p className="text-center text-gray-500">Loading categories...</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {categories.map((category, index) => (
      <Link
      to={`/categories/${encodeURIComponent(category.name)}`}
      key={index}
      className="bg-white border rounded-lg shadow hover:shadow-lg transition w-full"
    >
      <div className="w-full h-40 overflow-hidden flex items-center justify-center rounded-t-lg">
        <img
          src={category.image}
          alt={category.name}
          className="h-full object-contain"
        />
      </div>
      <p className="text-sm font-medium text-gray-800 text-center p-3">
        {category.name}
      </p>
    </Link>
    ))}
  </div>
)}
      </div>
    </div>
  );
};

export default HomePage;
