import React from "react";
import logo from '../assets/logo.jpg';

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e0f7fa, #ffffff)",
        display: "flex",
        justifyContent: "center",  // Centering content horizontally
        alignItems: "center",  // Centering content vertically
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",  // Limit width for larger screens
        }}
      >
        {/* Header with Logo */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            backgroundColor: "#ffffff",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Logo Image */}
          <img
            src={logo}
            alt="Quiz Platform Logo"
            style={{ height: "50px", marginRight: "15px" }}
          />
          
          {/* Title */}
          <h1 style={{ color: "#00796B", fontSize: "1.5rem", margin: 0 }}>
            Quiz Platform
          </h1>
        </header>

        {/* Main Content */}
        <main
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
