import BackButton from "@/app/(afterLogin)/_component/BackButton";
import styles from './singlePost.module.css';
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";

export default function SinglePost() {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <BackButton/>
                <h3 className={styles.headerTitle}>게시하기</h3>
            </div>
            {/*<Post />*/}
            <CommentForm />
            <div>
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
            </div>
        </div>
    )
}
