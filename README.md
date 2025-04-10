# SASSI - Students' Association of Indians in Milan


## About SASSI

SASSI is the Indian Student Association at Politecnico di Milano that aims to create a close-knit community for Indian students. It organizes cultural events, social gatherings, and workshops to celebrate Indian heritage, assist students in adapting to life in Milan, and foster academic and professional growth.

## Project Overview

This is the official website for SASSI, built using modern web technologies to serve as a comprehensive platform for the Indian student community in Milan. The website includes public information pages, member-only features, and an administrative backend for managing the organization.

## 🚀 Features

### Public Features
- **Home Page**: Information about SASSI's mission and initiatives
- **Events Calendar**: Browse upcoming and past events
- **Life in Milan**: Resources for living in Milan
- **University Networks**: Information about university connections
- **Contact Form**: Get in touch with the SASSI team

### Member Features
- **User Profiles**: Create and manage your profile
- **Member Directory**: Connect with other SASSI members
- **Event Registration**: Register for events (free and paid)
- **Resources Hub**: Access exclusive resources for Indian students in Milan
- **Team Applications**: Apply to join the SASSI team

### Admin Features
- **Dashboard**: Overview of site statistics
- **Membership Management**: Review and approve membership applications
- **Team Management**: Manage team structure and applications
- **Event Management**: Create, edit, and manage events
- **Resource Management**: Upload and categorize resources
- **User Management**: Manage user roles and permissions

## 🛠️ Tech Stack

- **Frontend**: 
  - React
  - Next.js 15
  - Tailwind CSS
  - TypeScript
  - Lucide Icons

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL Database
  - NextAuth.js for Authentication

- **Third-party Services**:
  - Stripe for Payments
  - Resend for Email Notifications
  - Cloudinary for Image Storage
  - Vercel for Deployment

## 📝 Project Structure

```
sassiweb/
├── app/               # Pages and API routes
│   ├── admin/         # Admin panel pages
│   ├── api/           # API endpoints
│   ├── auth/          # Authentication pages
│   ├── events/        # Event pages
│   ├── resources/     # Resources hub pages
│   └── join/          # Membership and team applications
├── components/        # Reusable UI components
├── lib/               # Utility functions and services
├── prisma/            # Database schema and migrations
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Stripe account (for payment processing)
- Resend account (for email services)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/sassiweb.git
cd sassiweb
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Initialize the admin account
```bash
npm run setup-admin
# or
yarn setup-admin
```

## 💼 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database with initial data

## 📚 Documentation

For more detailed documentation about the project structure, API endpoints, and development guidelines, please refer to the [SASSI Website Documentation](docs/README.md).

## 🔒 Authentication and Authorization

The application uses NextAuth.js for authentication with:
- Email/password authentication
- Role-based access control (USER/ADMIN roles)
- Protected routes via middleware
- Secure session management

## 💳 Payment Processing

The website integrates with Stripe for processing:
- Event registration payments
- Membership fee payments
- Team application fees

## 📧 Email Notifications

The system sends emails for:
- Membership status updates
- Team application status changes
- Payment confirmation
- Event registration confirmation
- Event reminders
- Password reset

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please contact the SASSI team at tech@sassimilan.com.
