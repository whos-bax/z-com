import styles from './profile.module.css';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";
import {getUserPosts} from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import {getUserServer} from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import {auth} from "@/auth";
import {User} from "@/model/User";

type Props = {
    params: { username: string },
}

export async function generateMetadata({params}: Props) {
    const user: User = await getUserServer({ queryKey: ["users", params.username] });
    return {
        title: `${user.nickname} (${user.id}) / Z`,
        description: `${user.nickname} (${user.id}) 프로필`,
        openGraph: {
            title: `${user.nickname} (${user.id}) / Z`,
            description: `${user.nickname} (${user.id}) 프로필`,
            images: [
                {
                    url: `https://z.nodebird.com${user.image}`, // Must be an absolute URL
                    width: 400,
                    height: 400,
                },
            ]
        }
    }
}

export default async function Profile({params}: Props) {
    const {username} = params;
    const session = await auth();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['users', username], queryFn: getUserServer})
    await queryClient.prefetchQuery({queryKey: ['posts', 'users', username], queryFn: getUserPosts})
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={styles.main}>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} session={session} />
                <div>
                    <UserPosts username={username} />
                </div>
            </HydrationBoundary>
        </main>
    )
}
