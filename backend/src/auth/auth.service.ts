import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Token> {
    const { name, email, password } = registerDto;
    
    // Check if user already exists
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    
    // Create new user
    const user = await this.usersService.create({
      name,
      email,
      password,
    });
    
    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    
    return { access_token };
  }

  async login(loginDto: LoginDto): Promise<Token> {
    const { email, password } = loginDto;
    
    // Find user by email
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Validate password
    const isValidPassword = await this.usersService.validatePassword(
      password,
      user.password,
    );
    
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    
    return { access_token };
  }
}