import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {getPostRecommends} from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

export default async function TabDeciderSuspense() {
    const queryClient = new QueryClient();
    // await queryClient.prefetchQuery({queryKey: ['posts', 'recommends'], queryFn: getPostRecommends})
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        initialPageParam: 0,
    })
    const dehydratedState = dehydrate(queryClient);
    // throw "에러";
    return (
        <HydrationBoundary state={dehydratedState}>
            <TabDecider/>
        </HydrationBoundary>
    )
}
