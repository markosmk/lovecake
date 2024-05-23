import { cookies } from "next/headers"

import { lucia, validateRequest } from "@/lib/auth/lucia"

export const POST = async () => {
  const { session } = await validateRequest()
  if (!session) {
    return new Response(null, {
      status: 401,
    })
  }

  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  // for express => res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize()).status(200).end();

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login", // redirect to login page
    },
  })
}
