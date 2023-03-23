import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { stripe } from '../stripe';
import { 
    requireAuth, 
    validateRequest,
    BadRequestError,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus
 } from '@raantickets/common';
 import { Order } from '../models/order';
 import { Payment } from '../models/payment';
 import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

 const router = express.Router();

 router.post('/api/payments',
 requireAuth,
 [
    body('token')
        .not()
        .isEmpty()
        .withMessage('Token must be provided'),
    body('orderId')
        .not()
        .isEmpty()
        .withMessage('orderId must be provided')
 ],
 validateRequest,
 async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if(!order) {
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    if(order.status === OrderStatus.Cancelled){
        throw new BadRequestError('Cannot pay for a cancelled order');
    }

    if(order.status === OrderStatus.Complete){
        throw new BadRequestError('Cannot repay an already paid order');
    }

    const charge = await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token
    });
    const payment = Payment.build({
        orderId,
        stripeId: charge.id
    });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId
    });

    res.status(201).send({ id: payment.id });
 });

 export { router as createChargeRouter };