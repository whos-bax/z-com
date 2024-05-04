export async function getFollowingPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings`, {
        next: {
            tags: ['posts', 'followings'],
        },
        credentials: 'include', // 로그인 유무 판단이 필요한 경우
        cache: 'no-store',
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
