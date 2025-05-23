import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt'
import { prisma } from '@/index'


const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== 'access') {
      throw new Error('Invalid token type')
    }
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true
      },
      where: { id: payload.sub }
    })
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)
