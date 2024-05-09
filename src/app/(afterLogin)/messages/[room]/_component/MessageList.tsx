"use client";

import style from "@/app/(afterLogin)/messages/[room]/chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import {DefaultError, InfiniteData, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {getMessages} from "@/app/(afterLogin)/messages/[room]/_lib/getMessages";
import {Message} from "@/model/Message";
import {useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useMessageStore} from "@/store/message";

interface Props {
    id: string;
}

export default function MessageList({id}: Props) {
    const {data: session} = useSession();
    const shouldGoDown = useMessageStore().shouldGoDown;
    const setGoDown = useMessageStore().setGoDown;
    const [pageRendered, setPageRendered] = useState(false);
    const [adjustingScroll, setAdjustingScroll] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const {
        data: messages,
        isFetching,
        hasPreviousPage,
        fetchPreviousPage,
    } = useInfiniteQuery<Message[], DefaultError, InfiniteData<Message[]>, [string, {
        senderId: string,
        receiverId: string
    }, string], number>({
        queryKey: ['rooms', {senderId: session?.user?.email!, receiverId: id}, 'messages'],
        queryFn: getMessages,
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => firstPage.length < 10 ? undefined : firstPage.at(0)?.messageId,
        getNextPageParam: (lastPage) => lastPage.length < 10 ? undefined : lastPage.at(-1)?.messageId,
        enabled: !!(session?.user?.email && id),
    })

    const {ref, inView} = useInView({
        threshold: 0,
        delay: 0,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasPreviousPage && fetchPreviousPage()
        }
    }, [inView, isFetching, hasPreviousPage, fetchPreviousPage, adjustingScroll]);

    let hasMessages = !!messages;
    useEffect(() => {
        if (hasMessages) {
            console.log(listRef.current);
            setTimeout(() => {
                if (listRef.current) {
                    listRef.current.scrollTop = listRef.current?.scrollHeight;
                }
            }, 100);
            setPageRendered(true);
        }
    }, [hasMessages]);

    useEffect(() => {
        if (shouldGoDown) {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current?.scrollHeight;
                setGoDown(false);
            }
        }
    }, [shouldGoDown, setGoDown]);

    return (
        <div className={style.list} ref={listRef}>
            {!adjustingScroll && pageRendered && <div ref={ref} style={{height: 1, background: 'yellow'}}/>}
            {messages?.pages?.map((page) => page.map((m) => {
                if (m.senderId === session?.user?.email) { // 내 메시지면
                    return (
                        <div
                            key={m.messageId}
                            className={cx(style.message, style.myMessage)}>
                            <div className={style.content}>{m.content}</div>
                            <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                        </div>
                    );
                }
                return (
                    <div
                        key={m.messageId}
                        className={cx(style.message, style.yourMessage)}>
                        <div className={style.content}>{m.content}</div>
                        <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                    </div>
                );
            }))}
        </div>
    )
}
