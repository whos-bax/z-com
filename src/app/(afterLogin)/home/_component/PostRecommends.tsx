"use client";

import {InfiniteData, useInfiniteQuery, useQuery, useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import {Post as IPost} from '@/model/Post'
import {string} from "prop-types";
import {Fragment, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import styles from "@/app/(afterLogin)/home/home.module.css";
import Loading from "@/app/(afterLogin)/home/loading";

export default function PostRecommends() {
    // const {data} = useQuery<IPost[]>({
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isPending,
        isLoading,
        isError,
    } =
        // useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
        useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        staleTime: 60 * 100, // fresh -> stale
        gcTime: 300 * 1000, // garbage collector time
        // initialData: () => [] // 초기 데이터 (reset)
        initialPageParam: 0, // [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]] - 2차원 배열
        getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    })

    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasNextPage) {
                const timer = setTimeout(() => {
                    fetchNextPage().then();
                }, 500)
                return () => clearTimeout(timer)
            }
        }
    }, [inView, isFetching, fetchNextPage, hasNextPage]);

    // useSuspenseInfiniteQuery
    // if (isPending) {
    //     return (
    //         <Loading/>
    //     )
    // }

    if (isError) {
        return "ERROR";
    }

    return (
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((post) => {
                        const lastPage = i === data?.pages.length - 1;
                        if (lastPage) {
                            return (
                                <div ref={ref} key={post.postId}>
                                    <Post post={post}/>
                                </div>
                            )
                        }
                        return (
                            <Post key={post.postId} post={post}/>
                        )
                    })}
                </Fragment>
            ))}
            {/*<div ref={ref} style={{height: 50}}/>*/}
        </>
    )
}

