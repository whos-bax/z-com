"use client";

import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import styles from "@/app/(afterLogin)/home/home.module.css";
import Loading from "@/app/(afterLogin)/home/loading";

export default function FollowingPosts() {
    // const {data, isPending} = useQuery<IPost[]>({
    const {data} = useSuspenseQuery<IPost[]>({
        queryKey: ['posts', 'followings'],
        queryFn: getFollowingPosts,
        staleTime: 60 * 100, // fresh -> stale
        gcTime: 300 * 1000, // garbage collector time
        // initialData: () => [] // 초기 데이터 (reset)
    })

    // useSuspenseQuery
    // if (isPending) {
    //     return (
    //         <Loading/>
    //     )
    // }

    return data?.map((post) => <Post key={post.postId} post={post}/>)
}

