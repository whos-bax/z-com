"use client";

import styles from './signup.module.css';
import onSubmit from '../_lib/signup';
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import { useFormState, useFormStatus } from 'react-dom';

function showMessage(message: string | null) {
    console.log('message', message);
    if (message === 'no_id') {
        return '아이디를 입력하세요.';
    }
    if (message === 'no_name') {
        return '닉네임을 입력하세요.';
    }
    if (message === 'no_password') {
        return '비밀번호를 입력하세요.';
    }
    if (message === 'no_image') {
        return '이미지를 업로드하세요.';
    }
    if (message === 'user_exists') {
        return '이미 사용 중인 아이디입니다.';
    }
    return '';
}

export default function SignupModal() {
    const [state, formAction] = useFormState(onSubmit, { message: null });
    const { pending } = useFormStatus();
    console.log('state', state);

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <BackButton />
                        <div>계정을 생성하세요.</div>
                    </div>
                    <form action={formAction}>
                        <div className={styles.modalBody}>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="id">아이디</label>
                                <input id="id" name="id" className={styles.input} type="text" placeholder=""
                                       required
                                />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="name">닉네임</label>
                                <input id="name" name="name" className={styles.input} type="text" placeholder=""
                                       required
                                />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="password">비밀번호</label>
                                <input id="password" name="password" className={styles.input} type="password" placeholder=""
                                       required
                                />
                            </div>
                            <div className={styles.inputDiv}>
                                <label className={styles.inputLabel} htmlFor="image">프로필</label>
                                <input id="image" name="image" required className={styles.input} type="file" accept="image/*"
                                />
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button type="submit" className={styles.actionButton} disabled={pending}>가입하기</button>
                            <div className={styles.error}>{showMessage(state?.message)}</div>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}
