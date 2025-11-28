import LoginSignup from '../lib/LoginSignup';
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { user } = useAuth0();
  if (!user) return <></>
  return (
    <main>
      <h1>Welcome, {user.name}!</h1>
    </main>
  );
}