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
    <div className="items-center justify-items-center">
      <main>
        {user ? (
          <>
            <div>{`Hello ${user?.displayName}`}</div>
            <Button onClick={handleSignOut}>Sign out</Button>
          </>
        ) : (
          <>
            <div>Hello, world</div>
            <Button onClick={handleSignIn}>Sign in</Button>
          </>
        )}
      </main>
    </div>
  );
}
