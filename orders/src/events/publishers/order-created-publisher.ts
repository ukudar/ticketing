import { Publisher, Subjects, OrderCreatedEvent } from '@raantickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}