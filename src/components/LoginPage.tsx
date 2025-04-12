import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("Logging in with:", { email, password });
    alert(`Logged in with email: ${email}`);
    // 👉 Later: Add real authentication logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
