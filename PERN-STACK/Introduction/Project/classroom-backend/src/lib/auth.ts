import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";

// now because of this any request matching tha tpath will be hndled by better auth
// and it will authenticate users on our behalf we dont haveto worry about jwt or tokens or handle sessions


export const auth = betterAuth({

secret: process.env.BETTER_AUTH_SECRET!,
trustedOrigins: [process.env.FRONTEND_URL],

  database: drizzleAdapter(db, { 
    provider: "pg", // or "pg" or "mysql"
  }), 

  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields:{
        role: {
            type: 'string', required: true, defaultVakye: 'student', input: true
        },


        imageCldPubId: {
            type:'string', required: false, input: true,
        }

    }
  }
  //... the rest of your config
});