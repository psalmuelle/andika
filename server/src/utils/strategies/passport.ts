import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { context } from "../../../prisma/client";
import dotenv from "dotenv";

dotenv.config();

const { prisma } = context;

passport.serializeUser(async (user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  try {
    const findUser = await prisma.user.findUnique({ where: { id } });
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, false);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const findUser = await prisma.user.findUnique({ where: { email } });
        if (!findUser) throw new Error("User not found");
        if (findUser.verified === false) throw new Error("User not verified");

        const isPasswordValid = await bcrypt.compare(
          password,
          findUser.password
        );
        if (!isPasswordValid) throw new Error("Invalid Credentials");
        done(null, findUser);
      } catch (error: any) {
        done(error.message, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: `${process.env.API_URI}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          throw new Error("No email found in profile");
        }

        const findUser = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!findUser) {
          const newUser = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              verified: true,
            },
          });
          done(null, newUser);
          return;
        }
        done(null, findUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
