import styles from './message.module.css';
import Room from "@/app/(afterLogin)/messages/_component/Room";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <h3>쪽지</h3>
            </div>
            <Room/>
            <Room/>
            <Room/>
            <Room/>
            <Room/>
            <Room/>
        </main>
    )
}
