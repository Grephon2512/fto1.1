// // import { NextApiRequest, NextApiResponse } from "next";
// // import Stripe from "stripe";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method === "POST") {
// //     try {
// //       const { quantity, totalAmount } = req.body;

// //       if (!quantity || !totalAmount) {
// //         return res.status(400).json({ error: "Missing quantity or totalAmount" });
// //       }

// //       const session = await stripe.checkout.sessions.create({
// //         payment_method_types: ["card"],
// //         line_items: [
// //           {
// //             price_data: {
// //               currency: "usd",
// //               product_data: {
// //                 name: "Customized T-Shirt",
// //               },
// //               unit_amount: totalAmount * 100, // Convert dollars to cents
// //             },
// //             quantity,
// //           },
// //         ],
// //         mode: "payment",
// //         success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
// //         cancel_url: `${req.headers.origin}/checkout`,
// //       });

// //       return res.status(200).json({ id: session.id });
// //     } catch (error) {
// //       console.error("Stripe Checkout Error:", error);
// //       return res.status(500).json({ error: (error as Error).message });
// //     }
// //   } else {
// //     res.setHeader("Allow", "POST");
// //     return res.status(405).end("Method Not Allowed");
// //   }
// // }


// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Received Data:", body); // Debugging log

//     const { quantity, totalAmount } = body;

//     if (!quantity || !totalAmount) {
//       return NextResponse.json({ error: "Missing quantity or totalAmount" }, { status: 400 });
//     }

//     console.log("Creating Stripe Session with:", { quantity, totalAmount });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Customized T-Shirt",
//             },
//             unit_amount: totalAmount * 100, // Convert to cents
//           },
//           quantity,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
//     });

//     console.log("Stripe Session Created:", session);
//     return NextResponse.json({ id: session.id }, { status: 200 });
//   } catch (error: any) {
//     console.error("Stripe Checkout Error:", error);
//     return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("Received Checkout Data:", req.body); // Debugging line

    const { quantity, totalAmount, tShirt, size } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `T-Shirt - ${tShirt.color}, ${size}`,
              images: [tShirt.frontTexture], // Ensure this is a valid URL
            },
            unit_amount: totalAmount * 100, // Convert to cents
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Stripe Session Created:", session); // Debugging line
    res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
}

