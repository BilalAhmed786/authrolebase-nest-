import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterSchema } from './dto/register.schema.js';
import { LoginSchema } from './dto/login.schema.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { Roles } from './decorators/roles.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return this.authService.register(result.data);
  }

  @Post('login')
  async login(@Body() body: unknown) {
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }

    return this.authService.login(result.data);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("USER")
  getProfile(@Req() req: Request) {
  return {
    user: (req as any).user,
  };
  }
}
