import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { AppError } from "../errors/AppError";

export const createDummyUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createDummyUser();
    res.json({
      success: true,
      message: "Usuario creado exitosamente",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al crear usuario",
      details: error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching user",
      details: error,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
