"use client";

import { Button } from "@/components/ui/button";
import { useUserSession } from "@/hooks/useUserSession";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { MouseEvent } from "react";

export default function Home({ initialUser }: { initialUser: User | null }) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: MouseEvent) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: MouseEvent) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header className="flex items-center justify-around">
      <h1>Flash</h1>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <div>{`Hello ${user.displayName}`}</div>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={handleSignIn}>Sign In</Button>
        )}
      </nav>
    </header>
  );
}
