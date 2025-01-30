"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "firebase/auth";
import { useUserSession } from "@/hooks/useUserSession";
import { signOut, signInWithGoogle } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserNav({ initialUser }: { initialUser: User | null }) {
  const user = useUserSession(initialUser);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signInWithGoogle();
  };

  const getUserAcronym = (user: User | null) => {
    if (!user || !user.displayName) return "G";

    return user.displayName
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getUserAcronym(user)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.displayName ?? "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem onClick={handleSignOut}>
            Sign out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleSignIn}>
            Sign In
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
