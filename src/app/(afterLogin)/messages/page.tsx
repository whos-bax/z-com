import styles from './message.module.css';
import Room from "@/app/(afterLogin)/messages/_component/Room";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '쪽지 / Z',
    description: '쪽지를 보내보세요.',
}
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
