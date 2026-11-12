// app/api/webhook/stripe/route.ts
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper: read raw body as text
async function buffer(readable: ReadableStream<Uint8Array>) {
  const chunks = [];
  const reader = readable.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  const bodyBuffer = await buffer(request.body as ReadableStream<Uint8Array>);
  const sig = (await headers()).get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyBuffer,
      sig!,
      endpointSecret
    );
  } catch (err: any) {
    console.error("❌ Error verifying webhook signature:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Demo site: payments are recorded in the logs only. A real product would
  // activate or renew the customer's plan here.
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log(`Checkout completed: session ${session.id}, plan ${session.metadata?.planId ?? "unknown"}`);
      break;
    }
    case "invoice.payment_succeeded":
      console.log(`Subscription payment succeeded: invoice ${event.data.object.id}`);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
