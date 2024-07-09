"use client";

import { auth } from "@/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        router.push("/room");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <main className="flex h-screen items-center justify-center">
      Loading...
    </main>
  );
}
