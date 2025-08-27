# Math and Language Synergy Website

A professional, responsive website demonstrating modern frontend development skills. 
Built for Math and Language Synergy, an academic institute specializing in English, Japanese, and Mathematics education.

## Table of Contents

1. [Key Development Features](#key-development-features)
2. [Technical Stack](#technical-stack)
3. [Project Structure](#project-structure)
4. [Development Highlights](#development-highlights)
   * 1. [Responsive Navigation](#responsive-navigation)
   * 2. [Dynamic Program Tabs](#dynamic-program-tabs)
   * 3. [Form Validation](#form-validation)
5. [Installation & Setup](#installation--setup)
6. [License](#license)
7. [Disclaimer](#disclaimer)

## Key Development Features

### Core Technical Skills Demonstrated

* **Semantic HTML5** - Proper document structure with accessibility in mind
* **Mobile-First CSS** - Responsive design using Flexbox and CSS Grid
* **Vanilla JavaScript** - No framework dependencies, clean ES6 implementation
* **Performance Optimized** - Lazy loading, efficient asset management
* **Allman Style Code** - Consistent, readable formatting throughout

### Advanced Implementation Details

* **Dynamic Content Loading** - JavaScript-powered tab system for programs
* **Form Validation** - Client-side validation with error handling
* **Lightbox Gallery** - Custom-built image viewer component
* **SEO Best Practices** - Semantic markup and proper meta tags
* **Cross-Browser Compatible** - Tested on modern browsers

## Technical Stack

| Category        | Technologies Used                    |
| --------------- | ------------------------------------ |
| **Frontend**    | HTML5, CSS3, JavaScript (ES6+)       |
| **Styling**     | CSS Variables, Flexbox, Grid         |
| **Workflow**    | Git, Allman Style, Responsive Design |
| **Performance** | Lazy Loading, Minified Assets        |

## Project Structure

```
math-language-synergy/
├── index.html              # Homepage
├── about.html              # About Us page
├── services.html           # Programs/Services
├── news.html               # News/Updates
├── gallery.html            # Photo Gallery
├── contact.html            # Contact Page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── script.js           # Core functionality
│   ├── services.js         # Programs tab system
│   └── lightbox.js         # Gallery lightbox
└── assets/
    └── images/             # All website imagery
```

## Development Highlights

### 1. Responsive Navigation

```javascript
// Mobile menu toggle with ARIA attributes
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', 
      toggle.classList.contains('active'));
  });
}
```

### 2. Dynamic Program Tabs

```javascript
// Services page tab system
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Tab switching logic
  });
});
```

### 3. Form Validation

```javascript
// Contact form validation
function validateForm() {
  const email = document.getElementById('email');
  if (!/^\w+@\w+\.\w+$/.test(email.value)) {
    showError(email, 'Please enter a valid email');
    return false;
  }
  return true;
}
```

## Installation & Setup

1. Clone repository:

   ```bash
   git clone https://github.com/HChristopherNaoyuki/math-and-language-synergy-website.git
   cd math-language-synergy
   ```

2. Run locally:

   * Simply open `index.html` in any modern browser
   * For development, use Live Server extension in VS Code

3. Customize:

   * Edit content in HTML files
   * Modify styles in `css/style.css`
   * Update scripts in `js/` directory

## License

Apache License 2.0 - See [LICENSE](LICENSE) for full details.

## DISCLAIMER

UNDER NO CIRCUMSTANCES SHOULD IMAGES OR EMOJIS BE INCLUDED DIRECTLY 
IN THE README FILE. ALL VISUAL MEDIA, INCLUDING SCREENSHOTS AND IMAGES 
OF THE APPLICATION, MUST BE STORED IN A DEDICATED FOLDER WITHIN THE 
PROJECT DIRECTORY. THIS FOLDER SHOULD BE CLEARLY STRUCTURED AND NAMED 
ACCORDINGLY TO INDICATE THAT IT CONTAINS ALL VISUAL CONTENT RELATED TO 
THE APPLICATION (FOR EXAMPLE, A FOLDER NAMED IMAGES, SCREENSHOTS, OR MEDIA).

I AM NOT LIABLE OR RESPONSIBLE FOR ANY MALFUNCTIONS, DEFECTS, OR ISSUES 
THAT MAY OCCUR AS A RESULT OF COPYING, MODIFYING, OR USING THIS SOFTWARE. 
IF YOU ENCOUNTER ANY PROBLEMS OR ERRORS, PLEASE DO NOT ATTEMPT TO FIX THEM 
SILENTLY OR OUTSIDE THE PROJECT. INSTEAD, KINDLY SUBMIT A PULL REQUEST 
OR OPEN AN ISSUE ON THE CORRESPONDING GITHUB REPOSITORY, SO THAT IT CAN 
BE ADDRESSED APPROPRIATELY BY THE MAINTAINERS OR CONTRIBUTORS.

---
