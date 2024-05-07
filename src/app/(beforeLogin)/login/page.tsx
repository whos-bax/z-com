// 'use client';
//
// import { useRouter } from "next/navigation";
// import Main from "../_component/Main";
// import {useSession} from "next-auth/react";
//
// export default function Login() {
//   const router = useRouter();
//   const { data: session } = useSession();
//
//   if (session?.user) {
//     router.replace('/home');
//     return null;
//   }
//
//   router.replace('/i/flow/login');
//   return (
//     <Main />
//   );
// }
import Main from "@/app/(beforeLogin)/_component/Main";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import RedirectToLogin from "@/app/(beforeLogin)/login/_component/RedirectToLogin";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
    return null;
  }

  return (
      <>
        <RedirectToLogin />
        <Main/>
      </>
  );
}
