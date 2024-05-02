export async function getPostRecommends() {
    const res = await fetch(`http://localhost:9090/api/postRecommends`, {
        next: {
            tags: ['posts', 'recommends'],
        },
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fet ch data')
    }
    // revalidateTag('posts')
    // revalidatePath('/home')
    return res.json();
}
