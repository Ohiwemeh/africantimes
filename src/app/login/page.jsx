"use client";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();

  const router = useRouter();

  if (status === "loading") {
    return <div >Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/")
  }
  
  return (
    <div >
      <div >
        <div  onClick={() => signIn("google")}>
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
