// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.log("Received Checkout Data:", data);

//     // Here, integrate with a payment provider like Stripe or Razorpay
//     return NextResponse.json({ success: true, message: "Checkout session created" });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: "Error processing checkout" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



export async function POST(req: Request) {
  try {
    const { quantity, totalAmount, tShirt } = await req.json();

    if (!quantity || !totalAmount || !tShirt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Custom T-Shirt",
              images: [tShirt.frontTexture], // ⚠️ Make sure this is a valid image URL
            },
            unit_amount: totalAmount * 100, // Convert ₹699 to paise (Stripe uses smallest currency unit)
          },
          quantity,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
