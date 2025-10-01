import { z } from "zod";

export const logInSchema = z.object({
  email: z.email(),
  password: z.string().min(6, " Your Password must be at least 6 characters")
});
