import styles from './search.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from "@/app/(afterLogin)/search/_component/SearchResult";

type Props = {
    searchParams: { q: string, f?: string, pf?: string };
}
export default function Search({searchParams}: Props) {
    return (
        <main className={styles.main}>
            <div className={styles.searchTop}>
                <div className={styles.searchZone}>
                    <div className={styles.buttonZone}>
                        <BackButton/>
                    </div>
                    <div className={styles.formZone}>
                        <SearchForm q={searchParams.q}/>
                    </div>
                </div>
                <Tab/>
            </div>
            <div className={styles.list}>
                <SearchResult searchParams={searchParams} />
            </div>
        </main>
    )
}
