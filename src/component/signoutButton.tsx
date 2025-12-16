import * as React from "react";

type SignOutButtonProps = {
  redirectUrl?: string; 
  label?: string;
};

const SignOutButton = ({
  redirectUrl = "/",
  label,
}: SignOutButtonProps) => {
  const handleSignOut = () => {
    document.cookie =
      "authiq_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
    window.location.href = redirectUrl;
  };
  return (
    <button onClick={handleSignOut}>
      {label || "Sign out"}
    </button>
  );
};

export { SignOutButton };
