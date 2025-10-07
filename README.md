# Math and Language Synergy Website

A comprehensive educational platform providing integrated language and mathematics education with modern web technologies and interactive features.

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

Math and Language Synergy is an educational website designed to 
provide comprehensive learning experiences in English, Japanese, 
and Mathematics. The platform integrates language learning with 
mathematical reasoning to create well-rounded educational outcomes 
for students of all levels.

**Key Objectives:**
- Provide integrated language and mathematics education
- Offer interactive learning experiences
- Support multiple user roles (students, lecturers)
- Ensure accessibility and mobile responsiveness
- Implement modern web design principles

## Technology Stack

**Frontend:**
- HTML5 with semantic markup
- CSS3 with custom properties and modern layouts
- Vanilla JavaScript (ES6+)
- Responsive design with Flexbox and Grid

**Backend Simulation:**
- LocalStorage for data persistence
- JavaScript modules for application logic
- File system simulation with text-based storage

**Design System:**
- Apple-inspired minimalistic design
- CSS custom properties for theming
- WCAG 2.0 accessibility compliance
- Mobile-first responsive approach

## Project Structure

```
math-and-language-synergy-website/
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── college.jpg
│   │   ├── high-school.jpg
│   │   └── young-professionals.jpg
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       ├── chatbot.js
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

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for enhanced functionality)

### Quick Start
1. Clone the repository:
```bash
git clone https://github.com/HChristopherNaoyuki/math-and-language-synergy-website.git
```

2. Navigate to the project directory:
```bash
cd math-and-language-synergy-website
```

3. Open `index.html` in your web browser or serve using a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

4. Access the application at `http://localhost:8000`

## Features

### Core Functionality
- **User Authentication**: Student and lecturer account management
- **Course Enrollment**: Multi-step enrollment process with form validation
- **Student Dashboard**: Progress tracking, resource management, and scheduling
- **Interactive Forum**: Discussion boards with real-time interactions
- **Chatbot Assistant**: AI-powered learning support
- **Payment System**: Cryptocurrency donation integration

### Educational Features
- **Language Programs**: English and Japanese immersion courses
- **Mathematics Courses**: Algebra, Calculus, and Applied Mathematics
- **Integrated Learning**: Combined language and math programs
- **Progress Tracking**: Visual progress indicators and achievement badges
- **Resource Library**: Downloadable learning materials

### Technical Features
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Accessibility**: WCAG 2.0 compliant with keyboard navigation
- **Form Validation**: Client-side validation with user feedback
- **Local Storage**: Data persistence across sessions
- **Interactive UI**: Smooth animations and transitions

## Model Implementation

### Data Models
```javascript
// User Model
{
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  accountType: 'student' | 'lecturer',
  dob: string,
  joinDate: string,
  progress: {
    english: number,
    japanese: number,
    math: number
  },
  badges: string[],
  events: array
}

// Course Model
{
  id: string,
  name: string,
  category: 'english' | 'japanese' | 'math',
  description: string,
  price: number,
  duration: string,
  level: 'beginner' | 'intermediate' | 'advanced'
}

// Forum Thread Model
{
  id: number,
  title: string,
  content: string,
  category: string,
  author: string,
  date: string,
  replies: number,
  views: number,
  likes: number,
  tags: string[]
}
```

### Storage Implementation
- **LocalStorage Simulation**: Browser-based data persistence
- **Text File Simulation**: Structured data storage in localStorage
- **Session Management**: User authentication state management

## Controller Implementation

### Authentication Controller (`auth.js`)
- User registration and login
- Session management
- Password validation
- Account type handling

### Dashboard Controller (`dashboard.js`)
- Progress tracking and visualization
- Calendar and scheduling
- Resource management
- Achievement system

### Forum Controller (`forum.js`)
- Thread creation and management
- Reply system
- Like functionality
- Search and filtering

### Chatbot Controller (`chatbot.js`)
- Natural language processing
- Context-aware responses
- Learning assistance
- FAQ integration

## View Implementation

### Page Templates
- **Homepage**: Hero section with program overview
- **Services**: Course catalog with detailed descriptions
- **About**: Institutional information and team profiles
- **Contact**: Multi-channel contact form
- **Dashboard**: Personalized student interface
- **Forum**: Interactive discussion platform

### Component Architecture
- **Radio Navigation**: State-based navigation system
- **Form Components**: Reusable input fields with validation
- **Card Layouts**: Consistent content containers
- **Modal System**: Pop-up dialogs for interactions
- **Notification System**: User feedback mechanisms

## Styling and Design

### Design System
```css
:root {
  /* Apple-inspired Color Palette */
  --apple-bg: #f5f5f7;
  --apple-card: #ffffff;
  --apple-text: #1d1d1f;
  --apple-gray: #86868b;
  --apple-blue: #0071e3;
  --apple-green: #34c759;
  
  /* Typography */
  --font-main: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-heading: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  
  /* Spacing System */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

### Responsive Breakpoints
- **Mobile**: 0px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode
- Reduced motion preferences

## Running the Application

### Development Mode
1. Open the project in a code editor
2. Use Live Server extension in VS Code for hot reloading
3. Access via `http://localhost:3000` (or configured port)

### Production Deployment
1. Upload all files to web hosting service
2. Ensure proper MIME types for JavaScript modules
3. Configure HTTPS for secure connections
4. Test across different browsers and devices

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This educational website is a prototype demonstration for academic and portfolio purposes. 
While functional for demonstration, it is not intended for production use without proper 
security implementations, database integration, and comprehensive testing.

**Important Notes:**
- User authentication uses browser localStorage and is not secure for production
- Payment processing is simulated and does not handle real transactions
- All data is stored locally in the browser and may be cleared
- The chatbot provides pre-defined responses and is not AI-powered
- File uploads and downloads are simulated for demonstration

For production deployment, consider implementing:
- Secure server-side authentication
- Database integration (PostgreSQL, MongoDB)
- Payment gateway integration (Stripe, PayPal)
- Cloud storage for files and resources
- SSL certificate implementation
- Comprehensive security testing

---
