"use client";

import styles from '../search.module.css';
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function Tab() {
    const [current, setCurrent] = useState('hot');
    const router = useRouter();
    const searchParams = useSearchParams();
    const onClickHot = () => {
        setCurrent('hot');
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('f');
        router.replace(`/search?${newSearchParams.toString()}`);
    }
    const onClickNew = () => {
        // if (searchParams.has('f')) {
        //
        // }
        setCurrent('new');
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('f', 'live');
        router.replace(`/search?${newSearchParams.toString()}`);
    }

    return (
        <div className={styles.homeFixed}>
            <div className={styles.homeTab}>
                <div onClick={onClickHot}>
                    인기
                    <div className={styles.tabIndicator} hidden={current === 'new'}></div>
                </div>
                <div onClick={onClickNew}>
                    최신
                    <div className={styles.tabIndicator} hidden={current === 'hot'}></div>
                </div>
            </div>
        </div>
    );
}
