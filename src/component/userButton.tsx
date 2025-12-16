import * as React from "react";
import { SignOutButton } from "./signoutButton";

type User = {
  name: string;
  email: string;
  image: string;
};

const UserButton = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [open, setOpen] = React.useState(false);

React.useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/external/validate-user",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      if (data.authenticated && data.session) {
        setUser(data.session);
      }
    } catch (e) {
      console.error(e);
    }
  };

  fetchUser();
}, []);


  if (!user) return null;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Avatar */}
      <img
        src={user.image}
        alt={user.name}
        onClick={() => setOpen(!open)}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          objectFit: "cover",
        }}
      />

      {/* Popover */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 0,
            width: 220,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            zIndex: 100,
          }}
        >
          <img
            src={user.image}
            alt={user.name}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "block",
              margin: "0 auto 8px",
              objectFit: "cover",
            }}
          />

          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 13, color: "#666" }}>{user.email}</div>
          </div>

          <div
            style={{
              width: "100%",
              padding: 8,
              border: "none",
              borderRadius: 6,
              backgroundColor: "#f44336",
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export { UserButton };
