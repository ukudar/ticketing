import { Publisher, Subjects, ExpirationCompleteEvent } from '@raantickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}