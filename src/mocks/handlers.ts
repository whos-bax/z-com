import {http, HttpResponse} from 'msw';
import {faker} from "@faker-js/faker";

const User = [
    {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
    {id: 'whosbax', nickname: '호상박', image: '/5Udwvqim.jpg'},
    {id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
]
export const handlers = [
    http.post('/api/login', () => {
        console.log('로그인');
        return HttpResponse.json(User[1], {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
            }
        })
    }),
    http.post('/api/logout', () => {
        console.log('로그아웃');
        return new HttpResponse(null, {
            headers: {
                'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.post('/api/users', async ({ request}) => {
        console.log('회원가입');
        // return HttpResponse.text(JSON.stringify('user_exists'), {
        //     status: 403,
        // })
        return HttpResponse.text(JSON.stringify('ok'), {
            headers: {
                'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0'
            }
        })
    })
]
