import { Publisher, Subjects, TicketCreatedEvent } from '@raantickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}