import { cache } from "react"
import { cookies } from "next/headers"
import { Lucia, type Session, TimeSpan, type User } from "lucia"

import { adapter } from "@/lib/database"

export const lucia = new Lucia(adapter, {
  // sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    // name: "session", // change name in production
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      // domain: "example.com"
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      email: attributes.email,
      username: attributes.username,
      name: attributes.name,
    }
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes // Omit<DatabaseUserAttributes, "id">
  }
}

interface DatabaseUserAttributes {
  email: string
  username: string
  name: string
}

type ResponseValidateRequest =
  | { user: User; session: Session }
  | { user: null; session: null }

export const validateRequest = cache(
  async (): Promise<ResponseValidateRequest> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
      return {
        user: null,
        session: null,
      }
    }

    const result = await lucia.validateSession(sessionId)
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
    } catch {
      // next.js throws when you attempt to set cookie when rendering page
    }
    return result
  }
)
