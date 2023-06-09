import { OrderCreatedEvent, OrderStatus } from "@raantickets/common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data:OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'asdwdawd',
        expiresAt: 'dadsdwd',
        ticket: {
            id: 'adwdaeefw',
            price: 10
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg };
};

it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const createdOrder = await Order.findById(data.id);
    expect(createdOrder!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});