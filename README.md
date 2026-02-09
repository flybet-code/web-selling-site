# Tech Services Platform

A full-stack application for selling web apps, mobile apps, and tech services with user authentication.

## Tech Stack

- **Frontend**: Next.js (React) with TypeScript and Tailwind CSS
- **Backend**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt password hashing

## Features

- Public landing page with services showcase
- User registration and login
- Protected user dashboard
- JWT-based authentication
- PostgreSQL database integration

## Security Best Practices

⚠️ **Important Security Notes:**
- Never commit `.env` files or any secrets to version control
- Always use `.env.example` as a template for environment variables
- Generate strong, unique secrets for production
- Use environment variables for all sensitive configuration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd tech-services-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   ```

3. Set up environment variables:
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env
   
   # Edit the .env file with your actual configuration
   # Never commit the .env file to version control
   ```

4. Set up the database:
   - Create a PostgreSQL database
   - Run the database schema: `psql -U your_username -d tech_services -f database.sql`

5. Run the application:
   ```bash
   # To run both servers concurrently:
   npm run dev
   
   # Or run individually:
   # Backend: cd backend && npm run start:dev
   # Frontend: cd frontend && npm run dev
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=tech_services
JWT_SECRET=your_very_secure_jwt_secret_key_change_this_in_production
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### Production Deployment

For production deployment:
1. Generate a strong JWT secret
2. Use environment variables for all configuration
3. Set `NODE_ENV=production`
4. Use a production database
5. Configure proper CORS settings
6. Never expose `.env` files

## Project Structure

```
tech-services-platform/
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── users/        # User management module
│   │   └── app.module.ts
│   ├── .env.example      # Environment template
│   └── ...
├── frontend/             # Next.js frontend
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   │   ├── page.tsx  # Landing page
│   │   │   ├── auth/     # Auth pages
│   │   │   └── dashboard/page.tsx
│   │   └── middleware.ts
│   └── ...
├── database.sql          # Database schema
├── .gitignore           # Git ignore rules
└── README.md            # Documentation
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### User
- `GET /users/profile` - Get user profile (requires authentication)

## Database Schema

The application uses a PostgreSQL database with the following tables:

### users
- id (UUID, primary key)
- name (VARCHAR)
- email (VARCHAR, unique)
- password_hash (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## Running Tests

To run backend tests:
```bash
cd backend && npm run test
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with guards
- Input validation and sanitization
- CORS configuration
- Secure environment variable handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes following conventional commits
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.