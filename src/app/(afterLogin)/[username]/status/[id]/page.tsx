import BackButton from "@/app/(afterLogin)/_component/BackButton";
import styles from './singlePost.module.css';
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import {User} from "@/model/User";
import {Post} from "@/model/Post";
import {getUserServer} from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import {getSinglePostServer} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePostServer";

type Props = {
    params: { id: string, username: string }
}

export async function generateMetadata({params}: Props) {
    const user: User = await getUserServer({ queryKey: ["users", params.username] });
    const post: Post = await getSinglePostServer({ queryKey: ["posts", params.id] });
    return {
        title: `Z에서 ${user.nickname} 님 : ${post.content}`,
        description: post.content,
    }
}
export default async function Page({params}: Props) {
    const {id} = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['posts', id], queryFn: getSinglePost})
    await queryClient.prefetchQuery({queryKey: ['posts', id, 'comments'], queryFn: getComments})
    const dehydratedState = dehydrate(queryClient);
    return (
        <div className={styles.main}>
            <HydrationBoundary state={dehydratedState}>
                <div className={styles.header}>
                    <BackButton/>
                    <h3 className={styles.headerTitle}>게시하기</h3>
                </div>
                <SinglePost id={id}/>
                <CommentForm id={id}/>
                <div>
                    <Comments id={id}/>
                </div>
            </HydrationBoundary>
        </div>
    )
}
