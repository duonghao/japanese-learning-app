import { User } from "firebase/auth";
import SiteNav from "@/components/header/site-navigation";
import UserNav from "@/components/header/user-navigation";
import Logo from "@/components/header/logo";

export default function Header({ initialUser }: { initialUser: User | null }) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <SiteNav />
        </div>
        <UserNav initialUser={initialUser} />
      </div>
    </header>
  );
}
