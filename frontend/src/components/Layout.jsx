export default function Layout({ children, title = "OnchainKMS" }) {
  return (
    <div
      style={{
        fontFamily: "Inter, Arial",
        minHeight: "100vh",
        background: "#f7f9fc",
        paddingBottom: "80px"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#229FD0",
          padding: "15px 20px",
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        {title}
      </div>

      {/* PAGE CONTENT */}
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
