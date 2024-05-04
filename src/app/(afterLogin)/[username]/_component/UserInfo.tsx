"use client";

import styles from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {User} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import {useSession} from "next-auth/react";
import cx from "classnames";
import {MouseEventHandler} from "react";
import {useRouter} from "next/navigation";
import {Session} from "@auth/core/types";

type Props = {
    username: string;
    session: Session | null;
}
export default function UserInfo({username, session}: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {data: user, error, isLoading} = useQuery<User, Object, User, [_1: string, _2: string]>({
        queryKey: ['users', username],
        queryFn: getUser,
        staleTime: 6 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
    // const {data: session} = useSession(); // 세션을 초기부터 수정하기 위해 props 로 내려받음

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
                if (index > -1) {
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
            }
            const value2: User | undefined = queryClient.getQueryData(['users', userId]);
            if (value2) {
                const shallow = {
                    ...value2,
                    Followers: [{userId: session?.user?.email as string}],
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
                if (index > -1) {
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
                if (index > -1) {
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
                if (index > -1) {
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
    })
    console.log('error');
    console.dir(error);

    if (error) {
        return (
            <>
                <div className={styles.header}>
                    <BackButton/>
                    <h3 className={styles.headerTitle}>프로필</h3>
                </div>
                <div className={styles.userZone}>
                    <div className={styles.userImage}></div>
                    <div className={styles.userName}>
                        <div>@{username}</div>
                    </div>
                </div>
                <div style={{
                    height: 100,
                    alignItems: 'center',
                    fontSize: 31,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    display: 'flex'
                }}>
                    계정이 존재하지 않음
                </div>
            </>
        )
    }
    if (!user) {
        return null;
    }
    const followed = user.Followers?.find(v => v.id === session?.user?.email);

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
        <>
            <div className={styles.header}>
                <BackButton/>
                <h3 className={styles.headerTitle}>{user.nickname}</h3>
            </div>
            <div className={styles.userZone}>
                <div className={styles.userRow}>
                    <div className={styles.userImage}>
                        <img src={user.image} alt={user.id}/>
                    </div>
                    <div className={styles.userName}>
                        <div>{user.nickname}</div>
                        <div>@{user.id}</div>
                    </div>
                    {user.id !== session?.user?.email &&
                        <button
                            onClick={onFollow}
                            className={cx(styles.followButton, followed && styles.followed)}>{followed ? '팔로잉' : '팔로우'}</button>}
                </div>
                <div className={styles.userFollower}>
                    <div>
                        {user._count.Followers} 팔로워
                    </div>
                    &nbsp;
                    <div>
                        {user._count.Followings} 팔로우 중
                    </div>
                </div>
            </div>
        </>
    )
}
