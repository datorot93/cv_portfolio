# PDF Optimization Guide
**Techniques for Print-Perfect Resume PDFs**

---

## 🎯 Overview

This guide provides practical techniques and code snippets for optimizing your Astro portfolio for PDF generation. Use these patterns when implementing print styles.

---

## 📐 Layout Optimization

### Pattern 1: Compact Hero Section

**Problem**: Hero section takes too much space on printed page
**Solution**: Reduce size significantly for print

```css
/* In components/sections/Hero.astro */
<style>
  /* ... existing web styles ... */

  @media print {
    .container {
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .info {
      padding-right: 0;
      gap: 0.25rem;
    }

    h1 {
      font-size: 14pt;
      margin-bottom: 2pt;
    }

    h2 {
      font-size: 10pt;
      margin-bottom: 2pt;
    }

    img {
      width: 48px;
      height: 48px;
      border-radius: 8px;
    }

    span {
      font-size: 8pt;
    }

    footer a {
      width: 24px;
      height: 24px;
      padding: 2px;
    }
  }
</style>
```

**Effect**: Reduces hero section from ~20% to ~10% of page

---

### Pattern 2: Two-Column Skills Layout

**Problem**: Skills section wastes horizontal space
**Solution**: Use two-column layout for print

```css
/* In components/sections/Skills.astro */
<style>
  /* ... existing web styles ... */

  @media print {
    .skills-container {
      column-count: 2;
      column-gap: 1rem;
      break-inside: avoid;
    }

    .skill-item {
      break-inside: avoid;
      margin-bottom: 0.25rem;
    }
  }
</style>
```

**HTML**:
```astro
<Section title="Skills">
  <div class="skills-container">
    {skills.map(skill => (
      <div class="skill-item">
        <strong>{skill.name}</strong>
        <span>{skill.keywords.join(', ')}</span>
      </div>
    ))}
  </div>
</Section>
```

---

### Pattern 3: Condensed Experience Timeline

**Problem**: Work experience dates take too much horizontal space
**Solution**: Stack dates vertically or use shorter format

```css
/* In components/sections/Experience.astro */
<style>
  /* ... existing web styles ... */

  @media print {
    header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    time {
      font-size: 8pt;
      display: inline;
    }

    /* Compact date format */
    time::before {
      content: "";
    }
  }
</style>
```

**Alternative**: Use shorter date format in JavaScript
```javascript
// Instead of "June/2022"
const compactDate = `${startDate.getMonth() + 1}/${startDate.getFullYear().toString().slice(-2)}`;
// Result: "6/22"
```

---

### Pattern 4: Remove Unnecessary Whitespace

**Problem**: Too much padding/margins waste page space
**Solution**: Aggressively reduce spacing for print

```css
/* In layouts/Layout.astro, @media print */
@media print {
  main {
    padding: 0.5rem 0.75rem !important;
    margin: 0 !important;
  }

  section {
    max-width: 100%;
    margin: 0 auto 0.5rem;
  }

  h2 {
    margin-bottom: 0.25rem;
    font-size: 11pt;
  }

  p {
    margin-bottom: 0.25rem;
  }

  ul {
    gap: 0.5rem !important;
  }
}
```

---

## 🎨 Typography Optimization

### Pattern 5: Print-Safe Font Stack

**Problem**: Web fonts may not load/print correctly
**Solution**: Use system font stack for print

```css
/* In layouts/Layout.astro */
<style is:global>
  @media print {
    html {
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Arial,
        sans-serif;
    }

    /* Ensure monospace code stays readable */
    code, pre {
      font-family: 'Courier New', Courier, monospace;
    }
  }
</style>
```

---

### Pattern 6: Optimized Type Scale

**Problem**: Web font sizes too large for print
**Solution**: Comprehensive print type system

```css
@media print {
  /* Base */
  html {
    font-size: 10pt;
    line-height: 1.4;
  }

  /* Headings */
  h1 { font-size: 16pt; line-height: 1.2; }
  h2 { font-size: 12pt; line-height: 1.3; }
  h3 { font-size: 10.5pt; line-height: 1.3; }
  h4 { font-size: 10pt; line-height: 1.3; }

  /* Body */
  p, li {
    font-size: 9.5pt;
    line-height: 1.4;
  }

  /* Small text */
  small, .meta {
    font-size: 8.5pt;
  }
}
```

---

### Pattern 7: Tighten Letter Spacing

**Problem**: Default letter spacing wastes horizontal space
**Solution**: Reduce tracking slightly for print

```css
@media print {
  body {
    letter-spacing: -0.01em;
  }

  h1, h2, h3 {
    letter-spacing: -0.02em;
  }
}
```

---

## 🖼️ Image & Media Optimization

### Pattern 8: Optimize Profile Image

**Problem**: Large profile image wastes space
**Solution**: Smaller, circular image for print

```css
/* In components/sections/Hero.astro */
@media print {
  figure {
    order: -1; /* Move image before text */
    margin-right: 0.5rem;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%; /* Fully circular */
    object-fit: cover;
  }
}
```

---

### Pattern 9: Hide Decorative Icons

**Problem**: Skill icons waste space and may not print well
**Solution**: Hide icons, show text only

```css
/* In components/sections/Skills.astro */
@media print {
  .skill-icon {
    display: none;
  }

  .skill-name {
    font-weight: 600;
    color: #000;
  }
}
```

---

### Pattern 10: Convert Images to High Contrast

**Problem**: Images may look washed out in print
**Solution**: Boost contrast for print

```css
@media print {
  img {
    filter: contrast(1.1) brightness(0.95);
  }
}
```

---

## 🔗 Link Optimization

### Pattern 11: Smart Link URL Display

**Problem**: Need to show some URLs but not all
**Solution**: Selective URL printing

```css
@media print {
  /* Hide all link underlines */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Show email addresses */
  a[href^="mailto:"]::after {
    content: " (" attr(href) ")";
    font-size: 0.75em;
    color: #333;
  }

  /* Show external portfolio/project links */
  .project-link::after {
    content: " - " attr(href);
    font-size: 0.75em;
    color: #666;
  }

  /* Hide social media URLs (icons are enough) */
  footer a::after {
    content: none !important;
  }

  /* Hide internal anchor links */
  a[href^="#"]::after {
    content: none;
  }
}
```

---

### Pattern 12: Clickable PDF Links

**Problem**: Want links to work in digital PDF
**Solution**: Keep href attributes, style for print

```css
@media print {
  a {
    /* Keep as link for PDF */
    color: #0066cc;
    text-decoration: none;
  }

  /* Optional: underline on important links */
  .external-link {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
}
```

---

## 📄 Page Control

### Pattern 13: Prevent Section Breaks

**Problem**: Sections split across pages awkwardly
**Solution**: Keep related content together

```css
@media print {
  /* Never break inside these */
  section,
  article,
  .experience-item,
  .education-item,
  .project-item {
    page-break-inside: avoid;
    break-inside: avoid; /* Modern syntax */
  }

  /* Keep header with content */
  h2, h3 {
    page-break-after: avoid;
    break-after: avoid;
  }

  /* Keep list items together */
  li {
    page-break-inside: avoid;
  }
}
```

---

### Pattern 14: Force Breaks Where Needed

**Problem**: Need to control where pages break
**Solution**: Strategic break points

```css
@media print {
  /* Always start new page before this section */
  .section-projects {
    page-break-before: always;
  }

  /* Avoid break after header */
  .section-header {
    page-break-after: avoid;
  }
}
```

---

### Pattern 15: Page Size Configuration

**Problem**: Need to target specific paper sizes
**Solution**: Use @page rules

```css
@media print {
  /* Default: Letter size */
  @page {
    size: letter portrait;
    margin: 0.5in;
  }

  /* Alternative: A4 size */
  @page {
    size: A4 portrait;
    margin: 1.5cm;
  }

  /* Custom size for specific content */
  @page :first {
    margin-top: 0.25in;
  }
}
```

---

## 🎨 Visual Enhancements

### Pattern 16: Print-Optimized Colors

**Problem**: Colors don't translate well to print/grayscale
**Solution**: Use grayscale-safe color palette

```css
@media print {
  /* Force all colors to grayscale-friendly values */
  :root {
    --text-primary: #000;
    --text-secondary: #333;
    --text-tertiary: #666;
    --border-color: #999;
  }

  /* Override brand colors */
  .accent-color {
    color: #000 !important;
  }

  /* Ensure borders are visible */
  border-color {
    border-color: #333 !important;
  }
}
```

---

### Pattern 17: Background Handling

**Problem**: Background colors/images disabled by default
**Solution**: Don't rely on backgrounds, use borders

```css
/* Instead of background colors */
@media screen {
  .highlight {
    background-color: #f0f0f0;
  }
}

@media print {
  .highlight {
    border-left: 2px solid #333;
    padding-left: 0.5rem;
  }
}
```

---

### Pattern 18: Border Optimization

**Problem**: Borders may be too light or heavy for print
**Solution**: Optimize border weights for print

```css
@media print {
  /* Thin borders for sections */
  section {
    border-bottom: 0.5pt solid #ccc;
    padding-bottom: 0.5rem;
  }

  /* Remove last border */
  section:last-child {
    border-bottom: none;
  }

  /* Subtle dividers */
  .divider {
    border-top: 0.25pt solid #ddd;
    margin: 0.5rem 0;
  }
}
```

---

## 🧩 Component-Specific Patterns

### Pattern 19: Compact Contact Info

**Problem**: Contact links take too much space
**Solution**: Inline compact format

```astro
<!-- In components/sections/Hero.astro -->
<footer class="contact-info">
  <a href={`mailto:${email}`}>{email}</a>
  <span class="separator">|</span>
  <a href={`tel:${phone}`}>{phone}</a>
  <span class="separator">|</span>
  <a href={linkedInUrl}>LinkedIn</a>
  <span class="separator">|</span>
  <a href={githubUrl}>GitHub</a>
</footer>

<style>
  @media print {
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      font-size: 8pt;
    }

    .separator {
      color: #999;
    }

    .contact-info a {
      color: #000;
    }

    /* Hide icon elements */
    .contact-info svg {
      display: none;
    }
  }
</style>
```

---

### Pattern 20: Bullet-Free Lists

**Problem**: Bullets waste horizontal space
**Solution**: Clean list styling for print

```css
@media print {
  ul {
    list-style: none;
    padding-left: 0;
  }

  /* Optional: Use custom markers */
  li::before {
    content: "▸ ";
    color: #666;
  }

  /* Or numbered items */
  ol {
    padding-left: 1.5em;
  }
}
```

---

## 🚀 Performance Patterns

### Pattern 21: Preload Critical Assets

**Problem**: Images/fonts not loaded when print dialog opens
**Solution**: Preload critical resources

```astro
<!-- In layouts/Layout.astro <head> -->
<head>
  <link rel="preload" as="image" href={basics.image} />
  <link rel="preload" as="font" href="/fonts/arial.woff2" type="font/woff2" crossorigin />
</head>
```

---

### Pattern 22: Defer Non-Critical CSS

**Problem**: Large CSS slows print rendering
**Solution**: Separate print CSS

```astro
<!-- In layouts/Layout.astro <head> -->
<link rel="stylesheet" href="/styles/screen.css" media="screen" />
<link rel="stylesheet" href="/styles/print.css" media="print" />
```

---

## 🧪 Testing Helpers

### Pattern 23: Print Preview Class

**Problem**: Hard to debug print styles without printing
**Solution**: Toggle print styles on screen

```astro
<!-- Add to layouts/Layout.astro -->
<script>
  // Press Ctrl+Shift+P to toggle print mode
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      document.body.classList.toggle('print-preview');
    }
  });
</script>

<style is:global>
  /* Apply print styles to screen when class is present */
  body.print-preview {
    /* Copy all @media print styles here */
    background: white;
    /* ... etc ... */
  }
</style>
```

---

### Pattern 24: Print Debug Borders

**Problem**: Hard to see element boundaries in print preview
**Solution**: Temporary debug borders

```css
/* Add to @media print for debugging, remove for production */
@media print {
  * {
    outline: 1px dotted red !important;
  }

  section {
    outline: 2px solid blue !important;
  }
}
```

---

## 📦 Complete Example

### Full Print-Optimized Layout.astro

```astro
---
// layouts/Layout.astro
const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>{title}</title>

  <!-- Print optimization -->
  <link rel="preload" as="image" href="/profile.webp" />
</head>
<body>
  <slot />
</body>
</html>

<style is:global>
  /* Screen styles */
  html {
    font-family: system-ui, sans-serif;
    background: #fff;
  }

  body {
    margin: 0;
    padding: 0;
  }

  /* Print styles */
  @media print {
    /* Page setup */
    @page {
      size: letter portrait;
      margin: 0.5in;
    }

    /* Reset */
    * {
      box-sizing: border-box;
    }

    html {
      font-size: 10pt;
      line-height: 1.4;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      color: #000;
      background: #fff;
    }

    /* Typography */
    h1 { font-size: 16pt; margin: 0 0 4pt 0; }
    h2 { font-size: 12pt; margin: 0 0 6pt 0; }
    h3 { font-size: 10.5pt; margin: 0 0 4pt 0; }
    p { font-size: 9.5pt; margin: 0 0 4pt 0; }

    /* Layout */
    main {
      padding: 0;
      margin: 0;
      max-width: 100%;
    }

    section {
      margin-bottom: 0.5rem;
      page-break-inside: avoid;
    }

    /* Links */
    a {
      color: #000;
      text-decoration: none;
    }

    /* Hide elements */
    nav,
    button,
    .no-print {
      display: none !important;
    }

    /* Images */
    img {
      max-width: 100%;
      height: auto;
    }
  }
</style>
```

---

## 🎯 Optimization Checklist

Before finalizing print styles, verify:

```markdown
- [ ] Used pt units for font sizes (not px)
- [ ] Set @page margins (0.5in recommended)
- [ ] Removed unnecessary padding/margins
- [ ] Hidden decorative elements
- [ ] Prevented page breaks in sections
- [ ] Used print-safe fonts
- [ ] Optimized images for print
- [ ] Handled links appropriately
- [ ] Tested in multiple browsers
- [ ] Verified grayscale appearance
- [ ] Checked PDF file size
- [ ] Tested on actual printer (if possible)
```

---

## 📚 Advanced Resources

### CSS Print Specifications
- [CSS Paged Media Module](https://www.w3.org/TR/css-page-3/)
- [CSS Fragmentation Module](https://www.w3.org/TR/css-break-3/)

### Tools
- [PagedJS Polyfill](https://www.pagedjs.org/) - Better @page support
- [Print-CSS.rocks](https://print-css.rocks/) - Examples and tools

### Debugging
- Chrome DevTools Rendering Panel
- Firefox's Print Preview DevTools
- [Browserstack](https://www.browserstack.com/) - Cross-browser testing

---

**Last Updated**: 2026-02-22
**Maintained By**: Technical Architect
**Next Update**: After Phase 2 implementation
