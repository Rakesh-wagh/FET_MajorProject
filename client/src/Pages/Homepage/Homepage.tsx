import React from "react";

const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      alert("Logout successful!");
      window.location.href = "/login";
    } else {
      alert("Logout failed.");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
const Homepage = () => {
  return (
    <>
      <h1>Welcome</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Logout
      </button>
    </>
  );
};

export default Homepage;
