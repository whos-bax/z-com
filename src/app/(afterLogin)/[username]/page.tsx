import styles from './profile.module.css';
import Post from "@/app/(afterLogin)/_component/Post";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Image from "next/image";
export default function Profile() {
  const user = {
    id: 'whosbax',
    nickname: '호상박',
    image: '/5Udwvqim.jpg'
  };

  return (
      <main className={styles.main}>
        <div className={styles.header}>
          <BackButton />
          <h3 className={styles.headerTitle}>{user.nickname}</h3>
        </div>
        <div className={styles.userZone}>
          <div className={styles.userImage}>
            <Image src={user.image} alt={user.id} width={134} height={134}/>
          </div>
          <div className={styles.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          <button className={styles.followButton}>팔로우</button>
        </div>
        <div>
          {/*<Post />*/}
          {/*<Post />*/}
          {/*<Post />*/}
          {/*<Post />*/}
          {/*<Post />*/}
          {/*<Post />*/}
        </div>
      </main>
  )
}
