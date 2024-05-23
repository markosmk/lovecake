import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "@node-rs/argon2"

import { lucia } from "@/lib/auth/lucia"
import { db } from "@/lib/database"
import { handlePrismaError } from "@/lib/auth/handlePrismaError"

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { identifier, password } = body

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Identifier and password are required" },
        { status: 400 }
      )
    }

    // const user = await db.user.findUnique({ where: { email: identifier } })
    const user = await db.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Invalid identifier or password" },
        { status: 401 }
      )
    }

    const isPasswordValid = await verify(user.hashedPassword!, password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid identifier or password" },
        { status: 401 }
      )
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return NextResponse.json({ message: "Login successful" }, { status: 200 })

    // return new Response(null, {
    //   status: 302,
    //   headers: {
    //     Location: "/",
    //     "Set-Cookie": sessionCookie.serialize()
    //   }
    // });
  } catch (e) {
    console.log(e)
    return handlePrismaError(e)
  }
}
