import styles from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import TrendSection from "@/app/(afterLogin)/explore/_component/TrendSection";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '탐색하기 / Z',
    description: '탐색해보세요.',
}

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.formZone}>
                <SearchForm/>
            </div>
            <div className={styles.trend}>
                <h3>나를 위한 트렌드</h3>
                <TrendSection/>
            </div>
        </main>
    )
}
