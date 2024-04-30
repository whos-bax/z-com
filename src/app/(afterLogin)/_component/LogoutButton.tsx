"use client"

import styles from "./logoutButton.module.css";

export default function LogoutButton() {
    const me = { // 임시로 내 정보 있는것처럼
        id: 'whosbax',
        nickname: '호상박',
        image: '/5Udwvqim.jpg',
    }

    const onLogout = () => {
    };

    return (
        <button className={styles.logOutButton} onClick={onLogout}>
            <div className={styles.logOutUserImage}>
                <img src={me.image} alt={me.id}/>
            </div>
            <div className={styles.logOutUserName}>
                <div>{me.nickname}</div>
                <div>@{me.id}</div>
            </div>
        </button>
    )
}
