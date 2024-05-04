"use client"

import styles from './followRecommend.module.css';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {User} from "@/model/User";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import cx from "classnames";
import Link from "next/link";
import {MouseEventHandler} from "react";

type Props = {
    user: User
}

export default function FollowRecommend({user}: Props) {
    const router = useRouter();
    const {data: session} = useSession();

    const queryClient = useQueryClient();
    const followed = !!user.Followers?.find(v => v.id === session?.user?.email);

    const follow = useMutation({
        mutationFn: (userId: string) => {
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
                method: 'post',
                credentials: 'include'
            })
        },
        onMutate(userId: string) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex(v => v.id === userId);
                const shallow = [...value];
                shallow[index] = {
                    ...shallow[index],
                    Followers: [{id: session?.user?.email as string}],
                    _count: {
                        ...shallow[index]._count,
                        Followers: shallow[index]._count?.Followers + 1,
                    }
                }
                queryClient.setQueryData(['users', 'followRecommends'], shallow);
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow = {
                    ...value2,
                    Followers: [{id: session?.user?.email as string}],
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers + 1,
                    }
                }
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
        onError(err, userId: string) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex(v => v.id === userId);
                const shallow = [...value];
                shallow[index] = {
                    ...shallow[index],
                    Followers: shallow[index].Followers.filter(v => v.id !== session?.user?.email),
                    _count: {
                        ...shallow[index]._count,
                        Followers: shallow[index]._count?.Followers - 1,
                    }
                }
                queryClient.setQueryData(['users', 'followRecommends'], shallow);
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow = {
                    ...value2,
                    Followers: value2.Followers.filter(v => v.id != session?.user?.email),
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers - 1,
                    }
                }
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
    })

    const unFollow = useMutation({
        mutationFn: (userId: string) => {
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
                method: 'delete',
                credentials: 'include'
            })
        },
        onMutate(userId: string) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex(v => v.id === userId);
                const shallow = [...value];
                shallow[index] = {
                    ...shallow[index],
                    Followers: shallow[index].Followers.filter(v => v.id !== session?.user?.email),
                    _count: {
                        ...shallow[index]._count,
                        Followers: shallow[index]._count?.Followers - 1,
                    }
                }
                queryClient.setQueryData(['users', 'followRecommends'], shallow);
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow = {
                    ...value2,
                    Followers: value2.Followers.filter(v => v.id != session?.user?.email),
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers - 1,
                    }
                }
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
        onError(err, userId: string) {
            const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
            if (value) {
                const index = value.findIndex(v => v.id === userId);
                const shallow = [...value];
                shallow[index] = {
                    ...shallow[index],
                    Followers: [{id: session?.user?.email as string}],
                    _count: {
                        ...shallow[index]._count,
                        Followers: shallow[index]._count?.Followers + 1,
                    }
                }
                queryClient.setQueryData(['users', 'followRecommends'], shallow);
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow: User = {
                    ...value2,
                    Followers: [{id: session?.user?.email as string}],
                    _count: {
                        ...value2._count,
                        Followers: value2._count?.Followers + 1,
                    }
                }
                queryClient.setQueryData(['users', userId], shallow);
            }
        },
    })

    const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (!session?.user) {
            router.push("/login");
        }
        if (followed) {
            unFollow.mutate(user.id);
        } else {
            follow.mutate(user.id);
        }
    };

    return (
        <Link href={`/${user.id}`} className={styles.container}>
            <div className={styles.userLogoSection}>
                <div className={styles.userLogo}>
                    <img src={user.image} alt={user.id}/>
                </div>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.title}>{user.nickname}</div>
                <div className={styles.count}>@{user.id}</div>
            </div>
            <div className={cx(styles.followButtonSection, followed && styles.followed)}>
                <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
            </div>
        </Link>
    )
}
