import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({title,price});
}

it('can fetch a list of tickets', async () => {
    await createTicket('dkjwkdw', 20);
    await createTicket('dwdw', 19);
    await createTicket('dadadwd', 18);

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});