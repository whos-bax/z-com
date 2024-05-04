import styles from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
// import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
// import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
// import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {Suspense} from "react";
import Loading from "@/app/(afterLogin)/home/loading";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import {auth} from "@/auth";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '홈 / Z',
    description: '홈',
}
// 1. page.tsx -> loading.tsx
// 2. 서버 Suspense -> fallback
// 3. react-query -> isPending
export default async function Home() {
    const session = await auth();
    return (
        <main className={styles.main}>
            <TabProvider>
                <Tab/>
                <PostForm me={session}/>
                {/* 최적화 */}
                <Suspense fallback={<Loading/>}>
                    <TabDeciderSuspense/>
                </Suspense>
            </TabProvider>
        </main>
    )
}
