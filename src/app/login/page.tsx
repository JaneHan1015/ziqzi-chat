"use client";

import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdValid, setPwdValid] = useState("");
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();

  const handleSignInSubmit = async (e: React.FormEvent) => {
    //Sign In sequence
    e.preventDefault();
    try {
      //Login with firebase
      await signInWithEmailAndPassword(auth, email, pwd);
      // navigate to /room
      router.push("/room");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd != pwdValid) {
      alert("Password not equal to valid");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, pwd);
      router.push("/room");
    } catch (err) {
      console.log(err);
    }
  };

  if (signUp) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form
          className="bg-white shadow p-8 rounded-xl w-full max-w-md"
          onSubmit={handleSignUpSubmit}
        >
          <h2 className="text-center text-2xl font-bold mb-8">Sign Up</h2>
          <input
            className="border border-gray-400 w-full mb-4 py-2 px-3 rounded"
            type="email"
            placeholder="ex) example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-400 w-full mb-4 py-2 px-3 rounded"
            type="password"
            placeholder="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            className="border border-gray-400 w-full mb-4 py-2 px-3 rounded"
            type="password"
            placeholder="password valid"
            value={pwdValid}
            onChange={(e) => setPwdValid(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
            onClick={() => {
              setSignUp(false);
              setEmail("");
              setPwd("");
              setPwdValid("");
            }}
          >
            <button
              onClick={() => {
                setSignUp(false);
              }}
            >
              Sign Up
            </button>
            Sign Up
            <button
              onClick={() => {
                setSignUp(false);
              }}
            >
              Go to Sign In
            </button>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow p-8 rounded-xl w-full max-w-md"
        onSubmit={handleSignInSubmit}
      >
        <h2 className="text-center text-2xl font-bold mb-8">
          Welcome to Ziqzi Chat
        </h2>
        <input
          className="border border-gray-400 w-full mb-4 py-2 px-3 rounded"
          type="email"
          placeholder="ex) example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-400 w-full mb-4 py-2 px-3 rounded"
          type="password"
          placeholder="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign In with email
        </button>
        <button
          onClick={() => {
            setSignUp(true);
            setEmail("");
            setPwd("");
          }}
        >
          Go to Sign Up
        </button>
      </form>
    </div>
  );
}
