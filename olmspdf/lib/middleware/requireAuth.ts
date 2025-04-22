// deno-lint-ignore-file
import jwt from "jsonwebtoken";



export async function requireAuth(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Unauthorized or missing token", { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    if (!decoded) {
        return new Response("Invalid or expired token", { status: 401 });
    }
    return {user: decoded};
}