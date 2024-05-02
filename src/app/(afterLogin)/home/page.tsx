import styles from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
// import {revalidatePath, revalidateTag} from "next/cache";

async function getPostRecommends() {
    const res = await fetch(`http://localhost:9090/api/postRecommends`, {
        next: {
            tags: ['posts', 'recommends'],
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fet ch data')
    }
    // revalidateTag('posts')
    // revalidatePath('/home')
    return res.json();
}

export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['posts', 'recommends'], queryFn: getPostRecommends})
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={styles.main}>
            <HydrationBoundary state={dehydratedState}>
                <TabProvider>
                    <Tab/>
                    <PostForm/>
                    {Array.from({length: 10}).map((_, index) => (
                        <div key={`post_${index}`}>
                            <Post/>
                        </div>
                    ))}
                </TabProvider>
            </HydrationBoundary>
        </main>
    )
}
