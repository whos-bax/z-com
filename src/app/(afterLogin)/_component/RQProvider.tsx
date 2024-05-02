"use client";

import React, {useState} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
    children: React.ReactNode;
};

function RQProvider({children}: Props) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {  // react-query 전역 설정
                queries: {
                    refetchOnWindowFocus: false, // tab 전환
                    retryOnMount: true, // 컴포넌트 mount
                    refetchOnReconnect: false, // 인터넷 연결 여부
                    retry: false, // 실패 시 재시도
                },
            },
        })
    );

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local' }/>
        </QueryClientProvider>
    );
}

export default RQProvider;
