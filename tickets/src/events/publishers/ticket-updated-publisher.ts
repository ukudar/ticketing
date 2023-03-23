import { Publisher, Subjects, TicketUpdatedEvent } from '@raantickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}