"use client"

import styles from './followRecommend.module.css';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {User} from "@/model/User";

type Props = {
    user: User
}

export default function FollowRecommend({user}: Props) {
    const router = useRouter();
    const {data} = useSession();
    const onFollow = () => {
        if (!data?.user) {
            router.push("/login");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.userLogoSection}>
                <div className={styles.userLogo}>
                    <img src={user.image} alt={user.id}/>
                </div>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.title}>{user.nickname}</div>
                <div className={styles.count}>@{user.id}</div>
            </div>
            <div className={styles.followButtonSection}>
                <button onClick={onFollow}>팔로우</button>
            </div>
        </div>
    )
}
