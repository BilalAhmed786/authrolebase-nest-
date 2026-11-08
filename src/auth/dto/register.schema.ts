import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;