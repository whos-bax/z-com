import styles from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Trend from "@/app/(afterLogin)/_component/Trend";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.formZone}>
                <SearchForm />
            </div>
            <div className={styles.trend}>
                <h3>나를 위한 트렌드</h3>
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
                <Trend />
            </div>
        </main>
    )
}
