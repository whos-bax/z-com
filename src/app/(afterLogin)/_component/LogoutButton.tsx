"use client"

import styles from "./logoutButton.module.css";
import {useRouter} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {Session} from "@auth/core/types";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    me: Session | null;
}
export default function LogoutButton({me}: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();
    // const {data: me} = useSession();

    // const me = { // 임시로 내 정보 있는것처럼
    //     id: 'whosbax',
    //     nickname: '호상박',
    //     image: '/5Udwvqim.jpg',
    // }

    const onLogout = () => {
        queryClient.invalidateQueries({
            queryKey: ["posts"],
        });
        queryClient.invalidateQueries({
            queryKey: ["users"],
        });
        signOut({redirect: false})
            .then(() => {
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
                    method: 'post',
                    credentials: 'include',
                });
                router.replace('/');
            })
    };

    if (!me?.user) {
        return null;
    }

    return (
        <button className={styles.logOutButton} onClick={onLogout}>
            <div className={styles.logOutUserImage}>
                <img src={me.user?.image as string} alt={me.user?.email as string}/>
            </div>
            <div className={styles.logOutUserName}>
                <div>{me.user?.name}</div>
                <div>@{me.user?.email}</div>
            </div>
        </button>
    )
}
