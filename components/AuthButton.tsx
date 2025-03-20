"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 text-white rounded-lg"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      Login with Google
    </button>
  );
}
