import { useEffect } from "react";
import * as React from "react"; 
type SignInButtonProps = {
  provider: string; // "google", "github", etc.
  websiteId: string;
  redirectUrl?: string; // optional, default "/"
  label?: string;
};

 const SignInButton = ({
  provider,
  websiteId,
  redirectUrl = "/",
  label,
}: SignInButtonProps) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      document.cookie = `authiq_token=${token}; path=/; Secure; SameSite=Lax`;

      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const handleSignIn = () => {
    const callbackUrl = `${window.location.origin}${window.location.pathname}`; // same page
    const authUrl = new URL(`http://localhost:3000/api/providers/${provider}`);
    authUrl.searchParams.set("websiteId", websiteId);
    authUrl.searchParams.set("redirectUrl", callbackUrl);
    window.location.href = authUrl.toString();
  };

  return (
    <button
      onClick={handleSignIn}
    >
      {label || `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </button>
  );
};

export {SignInButton}