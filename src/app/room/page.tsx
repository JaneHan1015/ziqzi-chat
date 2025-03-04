"use client";

import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div>
      <div>Room page!!!</div>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}
