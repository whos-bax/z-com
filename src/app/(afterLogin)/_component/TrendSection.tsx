"use client";

import styles from './trendSection.module.css';
import Trend from "@/app/(afterLogin)/_component/Trend";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";

export default function TrendSection() {
    const pathname = usePathname();
    const {data} = useSession();
    if (pathname === "/explore") return null;

    if (data?.user) {
        return (
            <div className={styles.trendBg}>
                <div className={styles.trend}>
                    <h3>나를 위한 트렌드</h3>
                    {Array.from({length: 10}).map((_, index) => (
                        <div key={`trend_${index}`}>
                            <Trend/>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.trendBg}>
                <div className={styles.noTrend}>
                    트렌드를 가져올 수 없습니다.
                </div>
            </div>
        )
    }
}
