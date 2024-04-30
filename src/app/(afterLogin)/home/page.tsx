import styles from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";

export default function Home() {
    return (
        <main className={styles.main}>
            <TabProvider>
                <Tab/>
                <PostForm/>
                {Array.from({length: 10}).map((_, index) => (
                    <div key={`post_${index}`}>
                        <Post/>
                    </div>
                ))}
            </TabProvider>
        </main>
    )
}
