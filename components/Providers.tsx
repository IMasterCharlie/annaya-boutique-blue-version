"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "sonner";

import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          // fail silently
        });
      });
    }
  }, []);
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
      }}
    >
      {children}
      <Toaster position="top-right" richColors />
    </Auth0Provider>
  );
}
