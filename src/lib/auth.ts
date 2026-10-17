import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

const client = new MongoClient(`${process.env.MONGODB_URI}`);
const db = client.db("NewsReader");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Sign-up attempt with your email",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 10px;">
          <h2>Sign-up Attempt Detected</h2>
          <p>Someone tried to create an account using your email address.</p>
          <p>If this was you, try signing in instead.</p>
          <p>If not, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <small style="color: #888;">Automated security notification.</small>
      </div>
        `,
      });
    },
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `      
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 10px;">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password.</p>
          <a href="${url}" style="display: inline-block; padding: 12px 20px; background: #18181b; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a>
          <p style="color: #888; font-size: 13px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
      `,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        html: `        
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 10px;">
          <h2>Verify Your Email</h2>
          <p>Please verify your email address to complete registration.</p>
          <a href="${url}" style="display: inline-block; padding: 12px 20px; background: #18181b; color: white; text-decoration: none; border-radius: 6px;">Verify Email</a>
          <p style="color: #888; font-size: 13px;">If you didn't create an account, you can ignore this email.</p>
        </div>`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 24 * 3600,
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
