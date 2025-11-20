'use client'

import { auth0 } from "../lib/auth0";
import LoginSignup from '../lib/LoginSignup';
import { SessionData } from "@auth0/nextjs-auth0/types";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [session, setSession] = useState<SessionData | null>(null)
  useEffect(() => {
    auth0.getSession()
      .then(setSession);
  }, []);

  if (!session) return (
    <LoginSignup />
  );

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
    </main>
  );
}