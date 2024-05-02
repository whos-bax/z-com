"use client";

import {useQuery} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'
import {getFollowingPosts} from "@/app/(afterLogin)/home/_lib/getFollowingPosts";

export default function FollowingPosts() {
    const {data} = useQuery<IPost[]>({
        queryKey: ['posts', 'followings'],
        queryFn: getFollowingPosts,
        staleTime: 60 * 100, // fresh -> stale
        gcTime: 300 * 1000, // garbage collector time
        // initialData: () => [] // 초기 데이터 (reset)
    })

    return data?.map((post) => (
        <Post key={post.postId} post={post}/>
    ))
}

