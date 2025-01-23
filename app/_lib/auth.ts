import NextAuth, {NextAuthConfig} from "next-auth";
import Google from "next-auth/providers/google";
import {createGuest, getGuest} from "@/app/_lib/data-service";
import {AdapterError} from "@auth/core/errors";

const authConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_SECRET,
        })
    ],
    callbacks: {
        authorized({ auth }) {
            return !!auth?.user;
        },
        async signIn({ user, account, profile }) {
            try {
                const existingGuest = await getGuest(user.email as string)
                if (!existingGuest) await createGuest({ email: user.email, fullName: user.name });
                return true;
            } catch (e) {
                return false;
            }
        },
        async session({ session, user }) {
            const guest = await getGuest(session?.user?.email);
            (session.user as any).guestId = guest?.id;
            return session;

        }
    },
    pages: {
        signIn: '/login',
    }
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);