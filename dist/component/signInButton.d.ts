import * as React from "react";
type SignInButtonProps = {
    provider: string;
    websiteId: string;
    redirectUrl?: string;
    label?: string;
};
declare const SignInButton: ({ provider, websiteId, redirectUrl, label, }: SignInButtonProps) => React.JSX.Element;
export { SignInButton };
