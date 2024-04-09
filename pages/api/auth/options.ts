import redis from '@/lib/db/upstash'
import GoogleProvider from 'next-auth/providers/google'
import { sendVerificationEmail } from '../email/verify/send'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword, generateRandomString, getPassword, hashPassword, setPassword } from '@/lib/utils/auth'

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID!,
      clientSecret: process.env.GOOGLE_AUTH_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'contact@launchfa.st' },
        password: { label: 'Password', type: 'password', placeholder: '*********' },
      },
      async authorize(credentials, req) {
        if (!redis) return null
        if (!credentials?.username) return null
        if (!credentials?.password) return null
        // Add your own email validation logic
        const doesUserExist = await getPassword(credentials.username)
        // Sign In
        if (doesUserExist) {
          // console.log('Signing In', credentials.username)
          // Generate a randomized password based on the user's input password
          const randomizedPassword = generateRandomString(credentials.password)
          // Hash the randomized password
          const hashedPassword = await hashPassword(randomizedPassword)
          // Compare the hashed randomized password with the original password
          // @ts-ignore
          const isPasswordCorrect = await comparePassword(doesUserExist, hashedPassword)
          if (isPasswordCorrect) {
            // If the passwords match, create a session cookie for the user
            return {
              email: credentials.username,
              id: JSON.stringify(doesUserExist),
            }
          }
          // console.log('Password did not match.')
          return null
        } else {
          // Sign Up
          // console.log('Signing Up', credentials.username)
          const randomizedPassword = generateRandomString(credentials.password)
          await setPassword(credentials.username, randomizedPassword)
          // console.log('User', credentials.username, 'signed Up')
          if (req.headers) {
            // console.log('Sending email from the referrer', req.headers['origin'])
            await sendVerificationEmail(req.headers['origin'], credentials.username)
          }
          return {
            email: credentials.username,
            id: JSON.stringify(randomizedPassword),
          }
        }
      },
    }),
  ],
}
