import { Publisher, Subjects, OrderCancelledEvent } from '@raantickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}