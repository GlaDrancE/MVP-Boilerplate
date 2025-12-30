import { PrismaClient } from "./prisma/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg"
const primsa = new PrismaClient({
    adapter: new PrismaPg(process.env.DATABASE_URL)
});

export default primsa
