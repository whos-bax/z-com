"use client";

import styles from "@/app/(afterLogin)/messages/message.module.css";
import {faker} from "@faker-js/faker";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import Image from "next/image";
import {Room} from "@/model/Room";

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
    room: Room;
}
export default function Room({room}: Props) {
    const router = useRouter();

    const onClick = () => {
        // router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
        router.push(`/messages/${room.room}`)
    };

    return (
        <div className={styles.room} onClickCapture={onClick}>
            <div className={styles.roomUserImage}>
                <img src={room.Receiver.image} alt="avartar" width={40} height={40}/>
            </div>
            <div className={styles.roomChatInfo}>
                <div className={styles.roomUserInfo}>
                    <b>{room.Receiver.nickname}</b>
                    &nbsp;
                    <span>@{room.Receiver.id}</span>
                    &nbsp;
                    ·
                    &nbsp;
                    <span className={styles.postDate}>
                        {dayjs(room.createdAt).fromNow(true)}
                    </span>
                </div>
                <div className={styles.roomLastChat}>
                    {room.content}
                </div>
            </div>
        </div>
    )
}
