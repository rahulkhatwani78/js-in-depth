import type { Request, Response, NextFunction } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserByIdService,
  deleteUserByIdService,
} from "../models/user.model.js";

function handleResponse(
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
) {
  return res.status(statusCode).json({ status: statusCode, message, data });
}

/**
 * Retrieves all users from the database
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
}

/**
 * Creates a new user in the database
 */
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { cust_name, cust_age, cust_email, cust_city } = req.body || {};
    if (!cust_name || !cust_age || !cust_email || !cust_city) {
      return handleResponse(
        res,
        400,
        "All fields (cust_name, cust_age, cust_email, cust_city) are required",
      );
    }
    const user = await createUserService(req.body);
    handleResponse(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves a single user by their ID
 */
export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "User ID is required");
    }
    const user = await getUserByIdService(id as string);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
}

/**
 * Updates an existing user by their ID
 */
export async function updateUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "User ID is required");
    }
    const { cust_name, cust_age, cust_email, cust_city } = req.body || {};
    if (!cust_name && !cust_age && !cust_email && !cust_city) {
      return handleResponse(
        res,
        400,
        "At least one field (cust_name, cust_age, cust_email, cust_city) is required",
      );
    }
    const user = await updateUserByIdService(id as string, req.body);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", user);
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes a user by their ID
 */
export async function deleteUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) {
      return handleResponse(res, 400, "User ID is required");
    }
    const user = await deleteUserByIdService(id as string);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", user);
  } catch (error) {
    next(error);
  }
}
