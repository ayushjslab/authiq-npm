import * as React from 'react';
import { useState, useEffect } from 'react';

const useValidateUser = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("authiq_token="))
                    ?.split("=")[1];
                if (!token)
                    throw new Error("No auth token found");
                const res = await fetch("https://authiq.vercel.app/api/external/validate-user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status}`);
                }
                const json = await res.json();
                setData(json);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { data, loading, error };
};

const SignInButton = ({ provider, websiteId, redirectUrl = "/", label, }) => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            document.cookie = `authiq_token=${token}; path=/; SameSite=Lax`;
            window.location.href = redirectUrl;
        }
    }, [redirectUrl]);
    const handleSignIn = () => {
        const callbackUrl = `${window.location.origin}${window.location.pathname}`; // same page
        const authUrl = new URL(`https://authiq.vercel.app/api/providers/${provider}`);
        authUrl.searchParams.set("websiteId", websiteId);
        authUrl.searchParams.set("redirectUrl", callbackUrl);
        window.location.href = authUrl.toString();
    };
    return (React.createElement("button", { onClick: handleSignIn }, label || `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`));
};

const SignOutButton = ({ redirectUrl = "/", label, }) => {
    const handleSignOut = () => {
        document.cookie =
            "authiq_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
        window.location.href = redirectUrl;
    };
    return (React.createElement("button", { onClick: handleSignOut }, label || "Sign out"));
};

const UserButton = () => {
    const [user, setUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("authiq_token="))
                    ?.split("=")[1];
                if (!token)
                    throw new Error("No auth token found");
                const res = await fetch("https://authiq.vercel.app/api/external/validate-user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok)
                    return;
                const data = await res.json();
                if (data.authenticated && data.session) {
                    setUser(data.session);
                }
            }
            catch (e) {
                console.error(e);
            }
        };
        fetchUser();
    }, []);
    if (!user)
        return null;
    return (React.createElement("div", { style: { position: "relative", display: "inline-block" } },
        React.createElement("img", { src: user.image, alt: user.name, onClick: () => setOpen(!open), style: {
                width: 40,
                height: 40,
                borderRadius: "50%",
                cursor: "pointer",
                objectFit: "cover",
            } }),
        open && (React.createElement("div", { style: {
                position: "absolute",
                top: 52,
                right: 0,
                width: 220,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                zIndex: 100,
            } },
            React.createElement("img", { src: user.image, alt: user.name, style: {
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "block",
                    margin: "0 auto 8px",
                    objectFit: "cover",
                } }),
            React.createElement("div", { style: { textAlign: "center", marginBottom: 10 } },
                React.createElement("div", { style: { fontWeight: 600 } }, user.name),
                React.createElement("div", { style: { fontSize: 13, color: "#666" } }, user.email)),
            React.createElement("div", { style: {
                    width: "100%",
                    padding: 8,
                    border: "none",
                    borderRadius: 6,
                    backgroundColor: "#f44336",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 14,
                } },
                React.createElement(SignOutButton, null))))));
};

export { SignInButton, SignOutButton, UserButton, useValidateUser };
//# sourceMappingURL=index.js.map
