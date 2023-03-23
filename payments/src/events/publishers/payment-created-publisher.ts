import { Subjects, Publisher, PaymentCreatedEvent } from "@raantickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}