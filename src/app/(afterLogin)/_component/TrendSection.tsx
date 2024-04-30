import style from './trendSection.module.css';
import Trend from "@/app/(afterLogin)/_component/Trend";

export default function TrendSection() {
    return (
        <div className={style.trendBg}>
            <div className={style.trend}>
                <h3>나를 위한 트렌드</h3>
                {Array.from({length: 10}).map((_, index) => (
                    <div key={`trend_${index}`}>
                        <Trend/>
                    </div>
                ))}
            </div>
        </div>
    )
}
