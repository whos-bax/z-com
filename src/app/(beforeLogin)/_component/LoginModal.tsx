"use client";

import styles from '@/app/(beforeLogin)/_component/login.module.css';
import {useState} from "react";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";

export default function LoginModal() {
    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const onSubmit = () => {
    };
    const onClickClose = () => {
    };

    const onChangeId = () => {
    };

    const onChangePassword = () => {
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <BackButton/>
                    <div>로그인하세요.</div>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.modalBody}>
                        <div className={styles.inputDiv}>
                            <label className={styles.inputLabel} htmlFor="id">아이디</label>
                            <input id="id" className={styles.input} value={id} onChange={onChangeId} type="text"
                                   placeholder=""/>
                        </div>
                        <div className={styles.inputDiv}>
                            <label className={styles.inputLabel} htmlFor="password">비밀번호</label>
                            <input id="password" className={styles.input} value={password} onChange={onChangePassword}
                                   type="password" placeholder=""/>
                        </div>
                    </div>
                    <div className={styles.message}>{message}</div>
                    <div className={styles.modalFooter}>
                        <button className={styles.actionButton} disabled={!id && !password}>로그인하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
