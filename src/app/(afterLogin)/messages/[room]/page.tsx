import styles from './chatRoom.module.css';
import cx from 'classnames'
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import dayjs from "dayjs";
import MessageForm from "@/app/(afterLogin)/messages/[room]/_component/MessageForm";
import {getUserServer} from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import {auth} from "@/auth";
import {QueryClient} from "@tanstack/react-query";
import UserInfo from "@/app/(afterLogin)/messages/[room]/_component/UserInfo";

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
    params: { room: string },
}
export default async function ChatRoom({params}: Props) {
    const session = await auth();
    const queryClient = new QueryClient();
    const ids = params.room.split('-').filter((v) => v !== session?.user?.email);
    if (!ids[0]) {
        return null;
    }

    await queryClient.prefetchQuery({queryKey: ['users', ids[0]], queryFn: getUserServer})

    const messages = [
        {messageId: 1, roomId: 123, id: 'zerohch0', content: '안녕하세요.', createdAt: new Date()},
        {messageId: 2, roomId: 123, id: 'hero', content: '안녕히가세요.', createdAt: new Date()},
    ]

    return (
        <main className={styles.main}>
            <UserInfo id={ids[0]}/>
            <div className={styles.list}>
                {messages.map((m) => {
                    if (m.id === 'zerohch0') { // 내 메시지면
                        return (
                            <div
                                key={m.messageId}
                                className={cx(styles.message, styles.myMessage)}>
                                <div className={styles.content}>{m.content}</div>
                                <div
                                    className={styles.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
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
            <MessageForm id={ids[0]}/>
        </main>
    )
}
