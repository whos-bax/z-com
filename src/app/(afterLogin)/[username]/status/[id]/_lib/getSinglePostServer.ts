import {QueryFunction} from "@tanstack/query-core";
import {Post} from "@/model/Post";
import {cookies} from "next/headers";

// export const getSinglePostServer: QueryFunction<Post, [_1: string, _2: string]>
export const getSinglePostServer
    = async ({queryKey}: {queryKey: [string, string]}) => {
    const [_1, id] = queryKey;
    const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
        next: {
            tags: ['posts', id],
        },
        credentials: 'include',
        headers: {Cookie: cookies().toString()},
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
