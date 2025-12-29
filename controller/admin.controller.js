import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../model/admin.model.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  try {
    const { phone, password, role, name } = req.body;

    if (!phone || !password || !role) {
      return res
        .status(400)
        .json({ success: false, status: 400, error: "Missing fields" });
    }

    const existingUser = await Admin.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, status: 400, error: "Admin already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const user = await Admin.create({
      phone,
      password: hashedPassword,
      role,
      name,
      isActive: role === "ADMIN",
    });

    res.status(200).json({
      message: "Admin registered",
      data: user,
      status: 200,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await Admin.findOne({ phone });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, status: 401, error: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, status: 401, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      data: user,
      status: 200,
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, status: 500, error: "Login failed" });
  }
});
