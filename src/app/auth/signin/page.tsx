"use client";

import * as React from "react";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/features";
import { useRouter } from "next/navigation";

export default function Page() {
  const { providers } = useAuth();
  const { push } = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <></>;
  }

  if (status === "authenticated") {
    push("/");
  }

  return (
    <>
      {providers && (
        <>
          <h1>Signin page</h1>

          {Object.values(providers).map((provider) => (
            <button key={provider.name} onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          ))}
        </>
      )}
    </>
  );
}
