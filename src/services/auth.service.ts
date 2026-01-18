import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { ConflictError, BadRequestError } from "../errors/AppError";
import { CreateUserDto } from "../schemas/user.schema";

export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;

  constructor() {
    this.JWT_SECRET = (process.env.JWT_SECRET || "default_secret") as string;
    this.JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as string;
  }

  generateToken(userId: string): string {
    // @ts-expect-error - TypeScript issue with process.env types
    return jwt.sign({ userId }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, this.JWT_SECRET) as { userId: string };
    } catch (error) {
      throw new BadRequestError("Invalid or expired token");
    }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = this.generateToken(user.id.toString());

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    };
  }

  async register(data: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ConflictError("Email already in use");
    }

    const passwordHash = await bcrypt.hash(data.passwordHash, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        passwordHash,
      },
    });

    const token = this.generateToken(user.id.toString());

    return { user, token };
  }
}

export const authService = new AuthService();
