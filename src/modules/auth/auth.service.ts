import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/authResponse.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private createAccessToken(user: IUser): string {
    const payload = {
      sub: user.user_id,
      role: user.role?.role_name,
      iss: 'dipstick',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_KEY'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
    });
  }

  private createRefreshToken(user: IUser): string {
    const payload = {
      sub: user.user_id,
      role: user.role?.role_name,
      iss: 'dipstick',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
  }

  async login(createAuthDto: CreateAuthDto): Promise<AuthResponseDto> {
    const { email, password } = createAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    });

    if (!user) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_KEY'),
    });

    const user = await this.prisma.user.findUnique({
      where: { user_id: payload.sub },
    });

    if (!user) {
      throw new HttpException(
        'Refresh token không hợp lệ',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      accessToken: this.createAccessToken(user),
      refreshToken: this.createRefreshToken(user),
    };
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.userService.findUserToLogin(email);
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        role_id: user.role_id,
      };
    }
    return null;
  }
}
