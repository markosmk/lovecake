import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { PrismaClient } from "@prisma/client"

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined
}

const optionsPrisma: any = {
  log: ["warn"], //  ["query"]
}
export const db = global.db || new PrismaClient(optionsPrisma)
if (process.env.NODE_ENV !== "production") global.db = db

export const adapter = new PrismaAdapter(db.session, db.user)
