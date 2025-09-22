# 📚 Quiet Hours Scheduler

A modern web application for scheduling distraction-free study sessions with automated email reminders. Create study blocks, manage your quiet hours, and receive timely notifications to maximize your productivity.

## 🌐 Live Demo

**[https://quiet-hours-scheduler-pt64.vercel.app/](https://quiet-hours-scheduler-pt64.vercel.app/)**

## ✨ Features

- 🔐 **User Authentication** - Secure login/signup with Supabase Auth
- 📅 **Study Block Management** - Create and manage personalized study sessions
- ⏰ **Smart Reminders** - Automated email notifications 10 minutes before each study block
- 👤 **User-Based Authorization** - Each user sees only their own study blocks
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🌙 **Dark Theme** - Eye-friendly dark mode interface
- 🚀 **Real-time Updates** - Instant UI updates when adding new blocks

## 🛠️ Technologies Used

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & API
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for storing study blocks
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Cloud database hosting

### Authentication
- **[Supabase](https://supabase.com/)** - Authentication and user management
- **Supabase Auth** - Email/password authentication
- **Row Level Security** - User-based data isolation

### Email System
- **[Nodemailer](https://nodemailer.com/)** - Email sending library
- **Gmail SMTP** - Email delivery service
- **App Passwords** - Secure Gmail authentication

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** - Frontend and API hosting
- **[EasyCron](https://www.easycron.com/)** - External cron job service for automated reminders

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **Git & GitHub** - Version control

## 🏗️ Project Structure

```
quiet-hours-scheduler/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── blocks/        # Study block CRUD operations
│   │   ├── dashboard/         # Dashboard page
│   │   ├── login/            # Login page
│   │   └── layout.js         # Root layout
│   ├── component/            # React Components
│   │   ├── Dashboard.js      # Main dashboard with logout
│   │   ├── StudyBlockForm.js # Form for creating blocks
│   │   └── StudyBlockList.js # Display user's blocks
│   └── page/                 # Page components
│       ├── Landing.js        # Landing page
│       └── Login.js          # Login form
├── pages/
│   └── api/
│       └── send-reminders.js # Cron job endpoint
├── utils/
│   ├── mongoClient.js        # MongoDB connection
│   └── supabaseClient.js     # Supabase configuration
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Supabase account
- Gmail account with App Password

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Priyankakatare0/Quiet-Hours-Scheduler.git
cd Quiet-Hours-Scheduler
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Email Configuration
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Get your service role key for backend operations
4. Enable email authentication

### MongoDB Setup
1. Create a cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user
3. Get your connection string
4. Database: `quiet_hours_scheduler`
5. Collection: `blocks`

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password for "Mail"
3. Use the 16-character app password in `EMAIL_PASS`

### EasyCron Setup
1. Sign up at [EasyCron.com](https://www.easycron.com/)
2. Create new cron job:
   - **URL**: `https://your-app.vercel.app/api/send-reminders`
   - **Schedule**: `* * * * *` (every minute)
   - **Method**: GET

## 📊 API Endpoints

### Study Blocks
- `GET /api/blocks/get?user_id={id}` - Get user's study blocks
- `POST /api/blocks/create` - Create new study block

### Cron Job
- `GET /api/send-reminders` - Send email reminders (called by EasyCron)

## 🔄 How It Works

1. **User Registration/Login** - Users sign up/login via Supabase Auth
2. **Create Study Blocks** - Users add study sessions with title, start time, and end time
3. **Data Storage** - Study blocks are stored in MongoDB with user association
4. **Automated Checking** - EasyCron calls the reminder API every minute
5. **Smart Notifications** - System checks for blocks starting in exactly 10 minutes
6. **Email Delivery** - Reminders are sent via Gmail SMTP to user's email
7. **Prevent Duplicates** - Blocks are marked as "notified" to avoid spam

## 🎨 UI/UX Features

- **Gradient Background** - Beautiful teal/gray gradient
- **Glass Morphism** - Modern backdrop-blur effects
- **Responsive Design** - Mobile-first approach
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages
- **Hover Effects** - Interactive button and card animations

## 🔒 Security Features

- **User Authentication** - Secure Supabase Auth integration
- **Data Isolation** - Users can only access their own data
- **Environment Variables** - Sensitive data stored securely
- **API Rate Limiting** - Built-in Next.js protections
- **HTTPS Everywhere** - Secure connections for all requests

## 🚀 Deployment

The application is deployed on **Vercel** with:
- Automatic builds from GitHub
- Environment variables configured
- Serverless functions for API routes
- Global CDN for fast loading

**External cron job** handled by **EasyCron** for reliable scheduling.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Supabase** for seamless authentication
- **MongoDB** for flexible data storage
- **Vercel** for effortless deployment
- **EasyCron** for reliable cron job scheduling
- **Tailwind CSS** for beautiful styling

---

**Built with ❤️ for productive studying**

*Create your perfect study environment with automated reminders!*
