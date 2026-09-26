import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { connectDB } from "./db";
import { Admin } from "@/models";

export const COOKIE_NAME = "kenz_admin_token";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_default_jwt_secret_kenz_2026_key";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export interface AdminTokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Hash a plain text password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password against hashed password
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign JWT token using jose (fully Edge- & Node-runtime compatible)
 */
export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Verify and decode JWT token using jose
 */
export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/**
 * Extract and verify admin token from Next.js request cookies
 */
export async function getSessionAdmin(req?: NextRequest): Promise<AdminTokenPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(COOKIE_NAME)?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get(COOKIE_NAME)?.value;
  }

  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Auto-seeds default admin if no admin accounts exist
 */
export async function ensureDefaultAdmin() {
  await connectDB();
  const count = await Admin.countDocuments();
  if (count === 0) {
    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@kenzengineering.com";
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@Kenz2026";
    const hashedPassword = await hashPassword(defaultPassword);

    await Admin.create({
      name: "Kenz Super Admin",
      email: defaultEmail.toLowerCase(),
      password: hashedPassword,
      role: "superadmin",
      isActive: true,
    });
    console.log(`[Auth] Created initial admin account: ${defaultEmail}`);
  }
}
