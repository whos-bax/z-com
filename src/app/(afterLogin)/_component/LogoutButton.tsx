"use client"

import styles from "./logoutButton.module.css";
import {useRouter} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {Session} from "@auth/core/types";

type Props = {
    me: Session | null;
}
export default function LogoutButton({me}: Props) {
    const router = useRouter();
    // const {data: me} = useSession();

    // const me = { // 임시로 내 정보 있는것처럼
    //     id: 'whosbax',
    //     nickname: '호상박',
    //     image: '/5Udwvqim.jpg',
    // }
    if (!me?.user) {
        return null;
    }

    const onLogout = () => {
        signOut({redirect: false})
            .then(() => {
                router.replace('/');
            })
    };

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
