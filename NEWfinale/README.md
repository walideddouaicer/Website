# WebWacos Website Project

This is a professional web development and design services website with a contact form connected to a serverless backend.

## Project Structure

The project is organized into a logical folder structure for better maintainability:

```
/
├── public/                  # Static web assets (published to Netlify)
│   ├── index.html           # Main homepage
│   ├── css/                 # Stylesheets
│   │   ├── style.css        # Main site styles
│   │   └── blogstyle.css    # Blog-specific styles
│   ├── js/                  # JavaScript files
│   │   └── script.js        # Main site scripts
│   └── pages/               # Additional HTML pages
│       ├── blog.html        # Blog listing page
│       ├── blog1.html       # Individual blog posts
│       ├── ...
│       ├── portfolio.html   # Portfolio page
│       └── services-detail.html # Services detail page
│
├── functions/               # Netlify serverless functions
│   └── submit-form.js       # Contact form handler
│
├── api/                     # Backend API code
│   └── server.js            # Server implementation (alternate to serverless)
│
├── config/                  # Configuration files
│   └── .env                 # Environment variables (not committed to Git)
│
├── netlify.toml             # Netlify configuration
├── package.json             # Node.js dependencies
└── .gitignore               # Git ignore file
```

## Setup Instructions

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up environment variables in `config/.env`:
   - EMAIL_HOST (e.g., "smtp.gmail.com")
   - EMAIL_PORT (e.g., 587)
   - EMAIL_USER (your email)
   - EMAIL_PASSWORD (your email password or app password)
   - TO_EMAIL (where to send form submissions)
4. Run locally: `npx netlify dev`
5. Deploy to Netlify: `npx netlify deploy --prod`

## Features

- Responsive design for all devices
- Contact form with email notifications
- Serverless backend using Netlify Functions
- Blog with multiple articles
- Services and portfolio showcase

## Technologies Used

- HTML5/CSS3
- JavaScript
- Node.js
- Netlify Functions
- Nodemailer 