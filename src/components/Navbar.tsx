import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-green-700 text-2xl font-bold">blinkit</div>
      
      <input
        type="text"
        placeholder="Search 'rice'"
        className="border rounded-lg p-2 w-1/3"
      />

      <div className="flex items-center space-x-4">
        <button
          className="text-gray-600"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button className="bg-green-700 text-white py-2 px-4 rounded-lg"
        onClick={() => navigate("/cart")}>
          My Cart
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
