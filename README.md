## Majita Care NPO – Part 3 Changelog (2025-11-03)

This document summarizes the updates implemented for Part 3 per the rubric (SEO, dynamic content, interactivity, forms, maps, and documentation).

### Summary of Part 3 changes
- SEO: Added meta descriptions and keywords; ensured meaningful image alt text; titles validated.
- Dynamic content: Rebuilt Gallery with client-side search, sort, and a responsive lightbox.
- Forms: Newsletter forms now have client-side validation and AJAX submit; added a “Quick Enquiry” form with validation and async response messages.
- Maps: Replaced static embed with an interactive Leaflet map and a simple locate control.
- Performance/UX: Lazy-loaded images; deferred scripts; improved accessibility with labels and aria-live messages.
- Fixes: Resolved invalid HTML tags in `home.html`.
- Crawling: Added `robots.txt` and `sitemap.xml`.

### Detailed changes
- SEO
  - Meta descriptions: `home.html`, `services.html`, `gallery.html`, `contact.html` (About already had one).
  - Meta keywords added to all pages.
  - Audited and added descriptive `alt` text for images.

- Dynamic Gallery
  - `gallery.html`: Containers for controls and items; script loading deferred.
  - `gallery.js`: Renders items, search (title/description/tags), sort (A–Z/Z–A), and lightbox with ESC/click-to-close.

- Forms
  - Newsletter forms (`home.html`, `about.html`, `contact.html`) now use validation + AJAX via `main.js`.
  - Quick Enquiry form added to `contact.html` (fields: name, email, phone, type, message, terms checkbox) with inline errors and async submission.

- Interactive Map
  - `contact.html`: Leaflet CSS/JS includes and `<div id="map">`.
  - `maps.js`: OpenStreetMap tiles, marker/popup, and a simple “locate me” control.

- Performance & Accessibility
  - `loading="lazy"` on images, deferred JS (`gallery.js`, `main.js`, `maps.js`).
  - Form messages use `aria-live="polite"`.

- Bug fixes
  - Removed stray closing tags in `home.html` (after Impact section).

- Crawling assets
  - `robots.txt`: Allows all, blocks `/_private/`, references sitemap.
  - `sitemap.xml`: Lists all pages with priorities/frequencies (update domain on deploy).

### Files changed/added
- Updated: `home.html`, `about.html`, `services.html`, `gallery.html`, `contact.html`
- Added/updated scripts: `gallery.js`, `main.js`, `maps.js`
- Added: `robots.txt`, `sitemap.xml`

### Test notes
1) Gallery: Open `gallery.html` → try search (e.g., “workshop”) and sort; click image for lightbox; use ESC/click outside to close.
2) Forms: Submit newsletter forms with invalid/valid inputs to see errors/success. Quick Enquiry form on `contact.html` validates all fields and shows response.
3) Map: On `contact.html`, pan/zoom; try the 📍 button to center on your location (if permitted).
4) SEO: Inspect page `<head>` to confirm title, description, and keywords.

### Deployment configuration required
- Replace the placeholder Formspree endpoint in `main.js` and `contact.html` (data-endpoint) with your real endpoint to receive form submissions.
- Update the domain in `robots.txt` and `sitemap.xml` once hosted.


