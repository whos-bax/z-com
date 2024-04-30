import Link from "next/link";
import styles from './trend.module.css';

export default function Trend() {
    return (
        <Link href={`/search?q=트렌드`} className={styles.container}>
            <div className={styles.count}>실시간트렌드</div>
            <div className={styles.title}>whosbax</div>
            <div className={styles.count}>1,234 posts</div>
        </Link>
    )
}
