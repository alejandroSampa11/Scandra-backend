import { ConflictError } from "../errors/AppError";
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { CreateUserDto, createUserSchema } from "../schemas/user.schema";

export class UserService {
  async createDummyUser() {
    return await prisma.user.create({
      data: {
        email: `test${Date.now()}@example.com`,
        passwordHash: "dummyHash123",
        fullName: "Usuario Prueba",
        currency: "MXN",
      },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictError("Email already in use");
    }

    return await prisma.user.create({ data });
  }
}

export const userService = new UserService();
