# Phishing Awareness Training

An interactive web-based training module designed to educate users about phishing attacks, how to recognize them, and best practices for staying safe online.

## Features

- Interactive slideshow presentation
- Real-world phishing examples
- Self-assessment quiz
- Responsive design for all devices
- Keyboard and touch navigation
- Progress tracking
- Animated scroll hint for better navigation
- Icon-enhanced headings for improved readability
- Mobile-friendly interface

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (Vanilla JS)
- Font Awesome Icons
- Google Fonts (Poppins)

## Getting Started

1. Clone this repository or download the files
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate favicon files:
   ```bash
   node generate-favicon.js
   ```
4. Open `index.html` in a modern web browser
5. Use the arrow keys, scroll wheel, or on-screen navigation to move between slides

## Project Structure

```
cyber/
├── index.html                 # Main HTML file
├── styles.css                 # All CSS styles
├── script.js                  # JavaScript functionality
├── site.webmanifest           # PWA manifest file
├── favicon.ico                # Default favicon
├── generate-favicon.js         # Script to generate favicon files
├── assets/
│   └── images/                # Image assets
│       ├── logo.svg           # Main logo in SVG format
│       ├── favicon-16x16.png  # 16x16 favicon
│       ├── favicon-32x32.png  # 32x32 favicon
│       ├── apple-touch-icon.png # iOS home screen icon
│       ├── logo-192x192.png   # PWA icon (192x192)
│       └── logo-512x512.png   # PWA icon (512x512)
└── README.md                  # documentation
```

## How to Use

1. Navigate through the slides using:
   - Arrow keys (← → ↑ ↓ or Space/Shift+Space)
   - Mouse wheel
   - On-screen navigation dots
   - Swipe gestures on touch devices
   - Scroll hint button at the bottom center of each slide

2. Complete the interactive quiz to test your knowledge
3. Review the key takeaways at the end of the presentation

## Customization

### Favicon Customization

To update the favicon:
1. Edit the SVG template in `generate-favicon.js`
2. Run `node generate-favicon.js` to generate all icon sizes
3. The favicon will update automatically in the browser

### Changing Content
- Edit the HTML in `index.html` to modify text and structure
- Update the quiz questions and answers in the JavaScript section

### Styling
- Customize colors by modifying the CSS variables in `:root`
- Adjust spacing, fonts, and animations in `styles.css`
- The scroll hint button can be customized in the `.scroll-hint` class
- Icons are from Font Awesome (already included via CDN)

### Adding More Slides
1. Add a new `<section class="slide">` element in `index.html`
2. Update the navigation dots in `script.js`
3. Style the new slide in `styles.css`

## Browser Support

- Chrome (latest) ✓
- Firefox (latest) ✓
- Safari (latest) ✓
- Edge (latest) ✓
- Mobile Safari (iOS 10+) ✓
- Chrome for Android ✓

> Note: Some visual effects like `backdrop-filter` may have limited support in older browsers.

## License


This project is open source and available under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Contact

For questions or feedback, feel free to reach out:

[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/your-linkedin-username/)

Or connect with me on [LinkedIn](https://www.linkedin.com/in/your-linkedin-username/)

---

*This training module is for educational purposes only.*
