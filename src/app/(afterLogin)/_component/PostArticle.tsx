"use client";

import {ReactNode} from "react";
import styles from './post.module.css';
import {useRouter} from "next/navigation";
import {Post} from "@/model/Post";

type Props = {
    children: ReactNode;
    post: Post;
    // post: {
    //     postId: number;
    //     content: string,
    //     User: {
    //         id: string,
    //         nickname: string,
    //         image: string,
    //     },
    //     createdAt: Date,
    //     Images: any[],
    // }
}

export default function PostArticle({children, post}: Props) {
    const router = useRouter();
    let target = post;
    if (post.Original) {
        target = post.Original;
    }
    const onClick = () => {
        router.push(`/${target.User.id}/status/${target.postId}`);
    }

    return (
        // <article onClickCapture={onClick} className={styles.post}>
        <article onClick={onClick} className={styles.post}>
            {children}
        </article>
    );
}
