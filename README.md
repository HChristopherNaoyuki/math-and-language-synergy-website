# Math and Language Synergy Website

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Features](#features)
- [Model Implementation](#model-implementation)
- [Controller Implementation](#controller-implementation)
- [View Implementation](#view-implementation)
- [Styling and Design](#styling-and-design)
- [Running the Application](#running-the-application)
- [License](#license)
- [Disclaimer](#disclaimer)

## Project Overview

Math and Language Synergy is a comprehensive educational website 
that provides integrated language and mathematics education. The 
platform offers courses in English, Japanese, and Mathematics, 
targeting students and professionals in South Africa who seek to 
enhance their academic and career prospects through bilingualism 
and analytical thinking skills.

The website features a modern, Apple-inspired design with responsive 
layouts, interactive elements, and a robust user management system 
that simulates file-based data storage for demonstration purposes.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Apple-inspired design principles
- **Storage**: LocalStorage simulation for data persistence
- **Icons**: Custom SVG icons and emoji-based icons
- **Fonts**: System fonts with fallbacks for optimal performance

## Project Structure

```
math-and-language-synergy-website/
├── assets/
│   ├── images/
│   │   ├── logo.jpg
│   │   ├── logo.png
│   │   ├── college.jpg
│   │   ├── high-school.jpg
│   │   └── young-professionals.jpg 
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       ├── chabot.js
│       ├── contact.js
│       ├── dashboard.js
│       ├── donation.js
│       ├── enrollment.js
│       ├── forum.js
│       ├── faq.js
│       ├── main.js
│       ├── payment.js
│       └── services.js
├── pages/
│   ├── about.html
│   ├── accessibility.html
│   ├── contact.html
│   ├── dashboard.html
│   ├── donation.html
│   ├── enrollment.html
│   ├── faq.html
│   ├── forum.html
│   ├── login.html
│   ├── payment.html
│   ├── privacy.html
│   ├── services.html
│   └── signup.html
├── resources/
└── index.html
```

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HChristopherNaoyuki/math-and-language-synergy-website.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd math-and-language-synergy-website
   ```

3. **Set up a local server** (required for proper functionality):
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node.js:
     ```bash
     npx http-server
     ```
   - Using PHP:
     ```bash
     php -S localhost:8000
     ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:8000`

## Features

### Core Features
- **User Authentication**: Registration and login system with role-based access
- **Course Management**: Comprehensive course catalog with enrollment functionality
- **Student Dashboard**: Personalized learning dashboard with progress tracking
- **Interactive Forum**: Community discussion platform with threaded conversations
- **Payment System**: Cryptocurrency donation and payment processing
- **Responsive Design**: Mobile-first design that works on all devices

### Educational Features
- **Language Programs**: English and Japanese language courses
- **Mathematics Programs**: Algebra, Calculus, and Applied Mathematics
- **Integrated Learning**: Combined language and math curriculum
- **Progress Tracking**: Visual progress indicators and achievement badges
- **Resource Library**: Downloadable learning materials and resources

### Technical Features
- **File System Simulation**: LocalStorage-based data persistence
- **Real-time Validation**: Form validation with immediate feedback
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation
- **SEO Optimization**: Semantic HTML and meta tags
- **Chatbot Assistant**: AI-powered learning assistant

## Model Implementation

The application uses a simulated file system approach with LocalStorage to mimic server-side data storage:

### User Data Model
```javascript
{
  id: "user_timestamp_random",
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  password: "hashed_password",
  accountType: "student", // or "lecturer"
  dob: "1990-01-01",
  joinDate: "2023-10-01T10:00:00Z",
  progress: {
    english: 75,
    japanese: 40,
    math: 90
  },
  badges: ["language_learner", "math_whiz"],
  events: []
}
```

### Course Data Model
```javascript
{
  id: "eng-101",
  name: "English Language Mastery",
  description: "Comprehensive English language program...",
  price: 9000,
  duration: "12 weeks",
  category: "language"
}
```

### File System Simulation
The application creates and maintains text file backups in LocalStorage:
- `users_data_backup` - User accounts and profiles
- `student_progress_backup` - Learning progress records
- `forum_threads_backup` - Discussion forum content
- `contact_submissions_backup` - Contact form submissions
- `donation_files` - Bitcoin donation records

## Controller Implementation

### Authentication Controller (`auth.js`)
- User registration and login
- Session management
- Role-based access control
- Password validation and security

### Dashboard Controller (`dashboard.js`)
- Progress tracking and visualization
- Course enrollment management
- Resource download tracking
- Calendar and event management

### Forum Controller (`forum.js`)
- Thread creation and management
- Reply system with likes
- Search and filtering
- Category-based organization

### Payment Controller (`donation.js`, `payment.js`)
- Cryptocurrency payment processing
- Bitcoin wallet integration
- Transaction tracking
- Donation management

## View Implementation

### Main Layout (`index.html`)
- Radio button navigation system
- Responsive header with logo
- Hero section with call-to-action
- Featured programs showcase
- Testimonials and social proof

### Page Templates
- **About**: Institutional information and team profiles
- **Services**: Course catalog and program details
- **Contact**: Contact form and location information
- **Dashboard**: Student learning interface
- **Forum**: Community discussion platform
- **Enrollment**: Course registration system

### Component System
- **Apple Cards**: Consistent card-based layout system
- **Form Components**: Reusable form elements with validation
- **Navigation**: Radio button-based navigation system
- **Modals**: Dynamic modal dialog system
- **Notifications**: Toast notification system

## Styling and Design

### Design System
- **Color Palette**: Apple-inspired colors with semantic meaning
- **Typography**: System fonts with optimal readability
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Border Radius**: Progressive border radius values
- **Shadows**: Layered shadow system for depth

### CSS Architecture
- **Variables**: CSS custom properties for theming
- **Components**: Modular component-based styling
- **Utilities**: Utility classes for common patterns
- **Responsive**: Mobile-first responsive design
- **Accessibility**: High contrast and reduced motion support

### Key Features
- **Dark/Light Mode Support**: CSS variable-based theming
- **Animation System**: Smooth transitions and micro-interactions
- **Form Styling**: Consistent form element styling
- **Button System**: Comprehensive button variants
- **Grid System**: CSS Grid and Flexbox layouts

## Running the Application

### Development Mode
1. Start a local server in the project root directory
2. Open `http://localhost:8000` in your browser
3. The application will initialize with sample data

### User Testing
1. **Register a new account**:
   - Navigate to Sign Up page
   - Fill in required information
   - Choose account type (Student/Lecturer)

2. **Explore courses**:
   - Browse Services page
   - View course details
   - Enroll in courses

3. **Use the dashboard**:
   - Track learning progress
   - Download resources
   - Participate in forum discussions

4. **Test payment system**:
   - Make Bitcoin donations
   - Process course payments

### Data Persistence
- All data is stored in browser's LocalStorage
- Data persists between sessions
- Text file backups are maintained for demonstration

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is a demonstration website created for educational purposes. 
The implementation uses browser LocalStorage to simulate file-based 
data storage and server functionality. In a production environment, 
this would be replaced with proper backend services, database systems, 
and secure authentication mechanisms.

**Important Notes**:
- All data is stored locally in the browser
- No actual payments are processed
- User authentication is simulated
- File system operations are emulated using LocalStorage
- This is not a production-ready system

For a production deployment, the following would be required:
- Backend API server
- Database system (PostgreSQL, MongoDB, etc.)
- Secure authentication (OAuth, JWT)
- Payment gateway integration
- Email service integration
- File storage system
- Security hardening

---
