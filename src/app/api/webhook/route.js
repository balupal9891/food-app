import { Order } from "@/models/Order";

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  // console.log(req)
  const sig = req.headers.get('stripe-signature');
  console.log("sig",sig);
  let event;

  try {
    const reqBuffer = await req.text();
    // console.log(reqBuffer)
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    console.log(event)

  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    // console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return Response.json('ok', { status: 200 });
}