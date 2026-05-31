# Breakthrough Training Institute Website

Professional marketing website for Breakthrough Training Institute - a healthcare training school offering CNA, Medical Assistant, and other professional programs.

## Features

- **Homepage** - Hero section, program overview, statistics, and call-to-action
- **Program Pages** - Detailed program information with enrollment forms
- **Blog** - Educational articles and insights with category filtering
- **Events Calendar** - Upcoming events, workshops, and graduations
- **Gallery** - Showcase of student achievements, graduations, and events
- **Instructor Profiles** - Meet the team, including Shanekia Lindsay (Program Director & Founder)
- **Contact Page** - Contact form and location information
- **Stripe Integration** - Secure payment processing for program enrollment

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Payments**: Stripe
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Top navigation bar
│   └── Footer.jsx          # Footer with contact info
├── pages/
│   ├── Home.jsx            # Homepage
│   ├── Programs.jsx        # Program listing
│   ├── ProgramDetail.jsx   # Individual program details
│   ├── Blog.jsx            # Blog listing
│   ├── BlogPost.jsx        # Blog post detail
│   ├── Events.jsx          # Events calendar
│   ├── Gallery.jsx         # Gallery/showcase
│   ├── Instructors.jsx     # Instructor profiles
│   ├── Contact.jsx         # Contact page
│   └── Checkout.jsx        # Payment checkout
├── data/
│   └── schoolData.js       # School info, programs, blog posts, events, gallery
├── App.jsx                 # Main app component with routing
├── main.jsx                # React entry point
└── index.css               # Global styles

```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Configuration

### School Information

Edit `src/data/schoolData.js` to update:
- School name, address, phone, email
- Programs and pricing
- Blog posts
- Events
- Gallery items
- Instructor profiles

### Stripe Integration

Set your Stripe publishable key in the environment:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_your_key_here
```

## Pages Overview

### Home
- Hero section with school tagline
- Feature highlights
- Program overview cards
- Statistics section
- Call-to-action buttons

### Programs
- Detailed program comparisons
- Features and benefits
- Enrollment information
- FAQ section

### Program Detail
- Full program description
- Enrollment form
- Stripe payment integration
- Program features and details

### Blog
- Article listing with categories
- Search and filter functionality
- Newsletter subscription
- Related articles

### Events
- Event calendar with filtering
- Event details and registration
- Monthly schedule view

### Gallery
- Image showcase with lightbox
- Category filtering
- Student testimonials
- Community statistics

### Instructors
- Instructor profiles
- Credentials and experience
- Teaching philosophy
- Contact information

### Contact
- Contact form
- Location and hours
- Phone and email
- FAQ section

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  primary: '#0a7ea4',      // Main blue
  secondary: '#f59e0b',    // Orange/gold
  accent: '#ff9f43',       // Light orange
}
```

### Content

All content is managed in `src/data/schoolData.js`. Update:
- `schoolData` - School information
- `programs` - Program details
- `instructors` - Instructor profiles
- `blogPosts` - Blog articles
- `events` - Calendar events
- `galleryItems` - Gallery images

## Deployment

The website is ready to deploy to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo and deploy
- **GitHub Pages**: `npm run build` and push `dist/` folder
- **AWS S3**: Upload `dist/` folder to S3 bucket

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_your_key_here
```

## Support

For questions or issues, contact:
- **Phone**: 314-649-5586
- **Email**: btiadmissionoffice@gmail.com
- **Address**: 11862 Lackland Rd, Suite BTI, St. Louis, MO 63146

## License

© 2024 Breakthrough Training Institute. All rights reserved.
