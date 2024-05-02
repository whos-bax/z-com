"use client";

import {useQuery} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'

export default function PostRecommends() {
    const {data} = useQuery<IPost[]>({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        staleTime: 60 * 100, // fresh -> stale
        gcTime: 300 * 1000, // garbage collector time
        // initialData: () => [] // 초기 데이터 (reset)
    })

    return data?.map((post) => (
        <Post key={post.postId} post={post}/>
    ))
}
