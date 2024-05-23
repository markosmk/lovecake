import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export const handlePrismaError = (e: any) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    switch (e.code) {
      case "P2002":
        return NextResponse.json(
          { error: "Username or email already taken" },
          { status: 400 }
        )
      default:
        return NextResponse.json(
          { error: "A database error occurred" },
          { status: 500 }
        )
    }
  } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    return NextResponse.json(
      { error: "An unknown database error occurred" },
      { status: 500 }
    )
  } else if (e instanceof Prisma.PrismaClientRustPanicError) {
    return NextResponse.json(
      { error: "A database panic occurred" },
      { status: 500 }
    )
  } else if (e instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json(
      { error: "Failed to initialize the database connection" },
      { status: 500 }
    )
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      { error: "Database validation error" },
      { status: 400 }
    )
  } else {
    console.error(e)
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    )
  }
}
