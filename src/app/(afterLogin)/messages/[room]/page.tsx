import {faker} from "@faker-js/faker";
import styles from './chatRoom.module.css';
import Link from "next/link";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import cx from 'classnames'
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import dayjs from "dayjs";

dayjs.locale('ko');
dayjs.extend(relativeTime)

export default function ChatRoom() {
    const user = {
        id: 'hero',
        nickname: '영웅',
        image: faker.image.avatar(),
    }
    const messages = [
        {messageId: 1, roomId: 123, id: 'zerohch0', content: '안녕하세요.', createdAt: new Date()},
        {messageId: 2, roomId: 123, id: 'hero', content: '안녕히가세요.', createdAt: new Date()},
    ]

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <BackButton/>
                <div><h2>{user.nickname}</h2></div>
            </div>
            <Link href={user.nickname} className={styles.userInfo}>
                <img src={user.image} alt={user.id}/>
                <div><b>{user.nickname}</b></div>
                <div>@{user.id}</div>
            </Link>
            <div className={styles.list}>
                {messages.map((m) => {
                    if (m.id === 'zerohch0') { // 내 메시지면
                        return (
                            <div
                                key={m.messageId}
                                className={cx(styles.message, styles.myMessage)}>
                                <div className={styles.content}>{m.content}</div>
                                <div className={styles.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                            </div>
                        );
                    }
                    return (
                        <div
                            key={m.messageId}
                            className={cx(styles.message, styles.yourMessage)}>
                            <div className={styles.content}>{m.content}</div>
                            <div className={styles.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                        </div>
                    );
                })}
            </div>
        </main>
    )
}
