import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {NextResponse} from "next/server";
import cookie from 'cookie';
import {cookies} from "next/headers";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
} = NextAuth({
    trustHost: true,
    pages: {
        signIn: '/i/flow/login',
        newUser: '/i/flow/signup',
    },
    // callbacks: {
    //     async authorized({request, auth}) {
    //         if (!auth) {
    //             return NextResponse.redirect(`https://localhost:3000/i/flow/login`)
    //         }
    //         return true;
    //     }
    // },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: credentials.username,
                        password: credentials.password,
                    }),
                })

                let setCookie = authResponse.headers.get('Set-Cookie');
                console.log('set-cookie', setCookie);
                if (setCookie) {
                    const parsed = cookie.parse(setCookie);
                    cookies().set('connect.sid', parsed['connect.sid'] , parsed); // 브라우저에 쿠키를 심어주는 것
                }

                if (!authResponse.ok) {
                    return null
                }

                const user = await authResponse.json()
                console.log('user', user);
                return {
                    email: user.id,
                    name: user.nickname,
                    image: user.image,
                    ...user,
                }
            },
        }),
    ]
});
