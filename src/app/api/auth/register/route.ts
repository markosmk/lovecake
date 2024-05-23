import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { hash } from "@node-rs/argon2"
import { cookies } from "next/headers"

import { db } from "@/lib/database"
import { lucia } from "@/lib/auth/lucia"
import { handlePrismaError } from "@/lib/auth/handlePrismaError"

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    )
  }

  try {
    const passwordHash = await hash(password)
    // const userId = generateIdFromEntropySize(10) // 16 characters long, only use if need id to create user

    const newUser = await db.user.create({
      data: {
        // id: userId, not necesary for mongodb
        email: email,
        hashedPassword: passwordHash,
      },
    })

    const session = await lucia.createSession(newUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return NextResponse.json(
      { message: "Register successful" },
      { status: 200 }
    )
    // return new Response(null, {
    //   status: 302,
    //   headers: {
    //     Location: "/me",
    //     "Set-Cookie": sessionCookie.serialize(),
    //   },
    // })
  } catch (e) {
    console.log(e)
    return handlePrismaError(e)
  }
}
