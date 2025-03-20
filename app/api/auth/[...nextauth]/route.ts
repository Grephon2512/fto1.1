// // import NextAuth, { AuthOptions } from "next-auth";
// // import GoogleProvider from "next-auth/providers/google";
// // import GitHubProvider from "next-auth/providers/github";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// // import clientPromise from "@/lib/mongodb";

// // export const authOptions: AuthOptions = {
// //   adapter: MongoDBAdapter(clientPromise),
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //     }),
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_CLIENT_ID!,
// //       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
// //     }),
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         // TODO: Add database user authentication logic here
// //         return null;
// //       },
// //     }),
// //   ],
// //   secret: process.env.NEXTAUTH_SECRET,
// //   session: {
// //     strategy: "database", // Fix the session strategy type issue
// //   },
// //   callbacks: {
// //     async session({ session, user }: any) {
// //       return session;
// //     },
// //   },
// // };

// // const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };





// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs"; // Secure password handling
// import jwt from "jsonwebtoken"; // For JWT authentication
// import { JWT } from "next-auth/jwt"; // NextAuth JWT type
// import { Session } from "next-auth"; // NextAuth Session type
// import { MongoClient, ObjectId } from "mongodb";

// export const authOptions: AuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing email or password");
//         }

//         const client: MongoClient = await clientPromise;
//         const db = client.db();
//         const user = await db.collection("users").findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         const isValidPassword = await bcrypt.compare(credentials.password, user.password);
//         if (!isValidPassword) {
//           throw new Error("Invalid password");
//         }

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           image: user.image,
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//         token.image = user.image;
//         token.accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
//           expiresIn: "7d",
//         });
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string;
//         session.user.name = token.name as string;
//         session.user.image = token.image as string;
//         (session as any).accessToken = token.accessToken as string; // Fix TypeScript error
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
          expiresIn: "7d",
        });
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.image as string,
        },
        accessToken: token.accessToken as string, // ✅ Fix TypeScript error
      } as Session; // ✅ Ensure correct return type
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
