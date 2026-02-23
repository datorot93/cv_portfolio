# Print Testing Workflow
**Quick Reference Guide for Testing Print-to-PDF**

---

## 🎯 Purpose

This document provides step-by-step workflows for testing the print functionality of the CV portfolio. Use this as a checklist whenever you make changes that might affect print output.

---

## 🚀 Quick Start

### Basic Print Test (30 seconds)

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
# Navigate to: http://localhost:4321

# 3. Print preview
# Windows/Linux: Ctrl + P
# macOS: Cmd + P

# 4. Visual check
# ✅ Single page?
# ✅ All content visible?
# ✅ Professional appearance?

# 5. Generate test PDF
# Click "Save" or "Print to PDF"
```

---

## 📋 Complete Testing Workflows

### Workflow 1: Development Print Test
**When**: After making any CSS or layout changes
**Time**: 2-3 minutes

```bash
# 1. Build production version (CSS is optimized)
npm run build

# 2. Preview production build
npm run preview

# 3. Open in browser
# http://localhost:4321

# 4. Open print preview (Ctrl+P / Cmd+P)

# 5. Check these items:
```

**Visual Checklist**:
- [ ] Page count: 1 page (or intentionally more)
- [ ] Margins: ~0.5in on all sides
- [ ] All sections present (Hero, About, Experience, Education, Skills)
- [ ] No content cut off at edges
- [ ] Text is readable (10pt minimum)
- [ ] Proper spacing between sections
- [ ] Dates aligned correctly
- [ ] Contact info visible and formatted

**Technical Checklist**:
- [ ] No console errors in print preview
- [ ] No layout shift when opening preview
- [ ] Images load before preview opens
- [ ] Fonts render correctly

```bash
# 6. Generate PDF
# Save to: ./test-pdfs/cv-[date].pdf

# 7. Open PDF and verify:
```

**PDF Checklist**:
- [ ] Text is selectable (not an image)
- [ ] Links work (if applicable)
- [ ] File size < 500KB
- [ ] Metadata shows correct title
- [ ] No rendering artifacts

---

### Workflow 2: Cross-Browser Print Test
**When**: Before major releases
**Time**: 10-15 minutes

**Browsers to Test**:
1. Chrome/Chromium
2. Firefox
3. Safari (macOS only)
4. Edge

**Process**:
```bash
# 1. Build and serve
npm run build && npm run preview

# 2. For EACH browser:
```

#### Chrome/Edge
```
1. Open http://localhost:4321
2. Ctrl+P (Cmd+P on mac)
3. Destination: "Save as PDF"
4. Paper size: "Letter" (or A4)
5. Margins: "Default"
6. Options:
   ✅ Headers and footers: OFF
   ❌ Background graphics: ON (optional)
7. Save as: cv-chrome-[date].pdf
8. Visual inspection
```

#### Firefox
```
1. Open http://localhost:4321
2. Ctrl+P (Cmd+P on mac)
3. Destination: "Save to PDF"
4. Paper size: "Letter" (or A4)
5. Margins: "Default"
6. Options:
   ✅ Print headers and footers: OFF
   ❌ Print backgrounds: ON (optional)
7. Save as: cv-firefox-[date].pdf
8. Visual inspection
```

#### Safari (macOS)
```
1. Open http://localhost:4321
2. Cmd+P
3. Click "Show Details"
4. Paper Size: "US Letter" (or A4)
5. Scale: 100%
6. ✅ Print headers and footers: OFF
7. PDF → Save as PDF
8. Save as: cv-safari-[date].pdf
9. Visual inspection
```

**Comparison Checklist**:
- [ ] Layout identical across browsers (within 5%)
- [ ] Font rendering similar
- [ ] Spacing consistent
- [ ] Images render correctly
- [ ] Page breaks in same places
- [ ] Document any differences

---

### Workflow 3: Print Quality Validation
**When**: Before final release
**Time**: 5-10 minutes

```bash
# 1. Generate test PDF (from Workflow 1)

# 2. Open PDF in viewer

# 3. Zoom to 100% (actual size)
```

**Quality Checklist**:

#### Typography Quality
- [ ] Text crisp and clear (not blurry)
- [ ] No font rendering issues
- [ ] Consistent font weights
- [ ] Proper kerning (letter spacing)
- [ ] No text overlap

#### Layout Quality
- [ ] Proper alignment (left, right, center)
- [ ] Consistent spacing
- [ ] No orphaned elements
- [ ] Margins consistent
- [ ] Section divisions clear

#### Visual Quality
- [ ] Images sharp and clear
- [ ] No pixelation
- [ ] Icons render properly
- [ ] Borders visible
- [ ] Adequate contrast

#### Content Quality
- [ ] All text present
- [ ] No placeholder text ("Lorem ipsum", etc.)
- [ ] Dates formatted consistently
- [ ] No broken links or references
- [ ] Contact info correct and complete

```bash
# 4. Print actual paper test (if possible)
```

**Physical Print Checklist**:
- [ ] Prints correctly on physical printer
- [ ] No content cut off
- [ ] Readable at arm's length
- [ ] Professional appearance
- [ ] Grayscale version looks good

---

### Workflow 4: Responsive Print Test
**When**: Testing different screen sizes
**Time**: 5 minutes

```bash
# 1. Start dev server
npm run dev

# 2. Open browser DevTools (F12)

# 3. Toggle device toolbar (Ctrl+Shift+M)
```

**Test at these viewport sizes**:
1. Desktop: 1920x1080
2. Laptop: 1366x768
3. Tablet: 768x1024
4. Mobile: 375x667

**Process for each size**:
```
1. Resize viewport to target size
2. Open print preview (Ctrl+P)
3. Verify layout
4. Document any issues
```

**Expected Result**: Print output should be **identical** regardless of viewport size (print CSS overrides screen CSS)

---

## 🧪 Automated Testing Scripts

### Script 1: Quick Visual Diff

Create a baseline PDF and compare future versions:

```bash
# Save as: .claude/skills/pdf-diff.sh

#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create test directory
mkdir -p ./test-pdfs

# Build project
echo "Building project..."
npm run build

# Start preview server in background
echo "Starting preview server..."
npm run preview &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Generate PDF using headless Chrome (requires Chrome/Chromium)
echo "Generating PDF..."
google-chrome --headless --disable-gpu \
  --print-to-pdf=./test-pdfs/cv-latest.pdf \
  http://localhost:4321

# Stop preview server
kill $SERVER_PID

# Compare with baseline (if exists)
if [ -f "./test-pdfs/cv-baseline.pdf" ]; then
  echo "Comparing with baseline..."
  # This would require a PDF comparison tool
  # Example: pdf-diff cv-baseline.pdf cv-latest.pdf
  echo "Visual inspection required"
else
  echo "No baseline found. Saving current as baseline..."
  cp ./test-pdfs/cv-latest.pdf ./test-pdfs/cv-baseline.pdf
fi

echo -e "${GREEN}✓ PDF generated: ./test-pdfs/cv-latest.pdf${NC}"
```

**Usage**:
```bash
chmod +x .claude/skills/pdf-diff.sh
./.claude/skills/pdf-diff.sh
```

---

### Script 2: Multi-Browser PDF Generation

Requires Puppeteer:

```bash
# Install Puppeteer
npm install -D puppeteer

# Create script: .claude/skills/generate-pdfs.js
```

```javascript
// generate-pdfs.js
const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePDF(browser, name) {
  const page = await browser.newPage();
  await page.goto('http://localhost:4321', {
    waitUntil: 'networkidle2'
  });

  const date = new Date().toISOString().split('T')[0];
  const filename = `./test-pdfs/cv-${name}-${date}.pdf`;

  await page.pdf({
    path: filename,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });

  console.log(`✓ Generated: ${filename}`);
  await page.close();
}

(async () => {
  // Create output directory
  if (!fs.existsSync('./test-pdfs')) {
    fs.mkdirSync('./test-pdfs');
  }

  const browser = await puppeteer.launch();

  // Generate PDF
  await generatePDF(browser, 'puppeteer');

  await browser.close();
})();
```

**Usage**:
```bash
# Start preview server
npm run build && npm run preview &

# Wait a moment, then run script
node .claude/skills/generate-pdfs.js

# Stop server
killall node
```

---

## 🐛 Debugging Print Issues

### Issue: Content overflows to page 2

**Debug Process**:
```bash
# 1. Open browser DevTools (F12)
# 2. Open print preview (Ctrl+P)
# 3. In DevTools, select "Print" media type
#    (DevTools → Console drawer → Rendering → Emulate CSS media type → print)

# 4. Inspect elements to find which section is too tall
# Use "Inspect Element" on sections

# 5. Check computed styles:
#    - margin-bottom on sections
#    - padding on main container
#    - height/min-height on elements

# 6. Adjust print CSS in Layout.astro
# Reduce spacing, padding, or font sizes

# 7. Test again
```

**Quick Fixes**:
```css
/* In Layout.astro, @media print */

/* Reduce main padding */
main {
  padding: 2rem 1rem; /* was 4rem */
}

/* Reduce section spacing */
section {
  margin-bottom: 0.5rem; /* was 1rem */
}

/* Reduce font sizes slightly */
body {
  font-size: 9.5pt; /* was 10pt */
}
```

---

### Issue: Fonts look different in print

**Debug Process**:
```bash
# 1. Check font loading in Network tab
# 2. Verify fonts load before print preview opens
# 3. Check for font fallbacks

# Fix: Use system fonts for print
```

```css
@media print {
  body {
    font-family: Arial, sans-serif; /* Force system font */
  }
}
```

---

### Issue: Images not appearing

**Debug Process**:
```bash
# 1. Check Console for image load errors
# 2. Verify image URLs are absolute (not relative)
# 3. Check if images are loaded before print

# Fix: Preload critical images
```

```html
<!-- In Layout.astro <head> -->
<link rel="preload" as="image" href="/path/to/profile.webp">
```

---

## 📊 Test Results Template

Copy this template for documenting test results:

```markdown
# Print Test Results - [Date]

## Test Environment
- **Date**: YYYY-MM-DD
- **Tester**: [Name]
- **Build Version**: [git commit hash]
- **Node Version**: [version]

## Browser Tests

### Chrome/Chromium [version]
- ✅/❌ Single page layout
- ✅/❌ All content visible
- ✅/❌ Professional appearance
- ✅/❌ PDF < 500KB
- **Issues**: [List any issues]

### Firefox [version]
- ✅/❌ Single page layout
- ✅/❌ All content visible
- ✅/❌ Professional appearance
- ✅/❌ PDF < 500KB
- **Issues**: [List any issues]

### Safari [version] (macOS only)
- ✅/❌ Single page layout
- ✅/❌ All content visible
- ✅/❌ Professional appearance
- ✅/❌ PDF < 500KB
- **Issues**: [List any issues]

## Quality Checks
- ✅/❌ Typography crisp and clear
- ✅/❌ Proper spacing
- ✅/❌ Images sharp
- ✅/❌ Grayscale looks good
- ✅/❌ Physical print test passed

## Overall Status
- **Pass/Fail**: [PASS or FAIL]
- **Ready for production**: Yes/No
- **Action items**: [List any fixes needed]

## Screenshots
- Attached: `test-results-[date]/`
  - chrome-screenshot.png
  - firefox-screenshot.png
  - safari-screenshot.png
  - cv-latest.pdf
```

---

## 🔄 Continuous Testing

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "Running print build test..."

# Build project
npm run build > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Fix errors before committing."
  exit 1
fi

echo "✓ Build successful"
exit 0
```

**Usage**:
```bash
chmod +x .git/hooks/pre-commit
```

---

### GitHub Actions (CI/CD)

Add to `.github/workflows/test-print.yml`:

```yaml
name: Print PDF Test

on: [pull_request]

jobs:
  test-pdf:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Install Puppeteer
        run: npm install -D puppeteer

      - name: Generate PDF
        run: |
          npm run preview &
          sleep 5
          node .claude/skills/generate-pdfs.js

      - name: Check PDF size
        run: |
          SIZE=$(wc -c < ./test-pdfs/cv-puppeteer-*.pdf)
          if [ $SIZE -gt 512000 ]; then
            echo "❌ PDF too large: ${SIZE} bytes"
            exit 1
          fi
          echo "✓ PDF size OK: ${SIZE} bytes"

      - name: Upload PDF artifact
        uses: actions/upload-artifact@v3
        with:
          name: test-pdf
          path: ./test-pdfs/*.pdf
```

---

## 📚 References

- [Chrome Print Documentation](https://developer.chrome.com/docs/devtools/rendering/print-preview/)
- [Firefox Print Settings](https://support.mozilla.org/en-US/kb/print-web-pages-firefox)
- [Safari Print Guide](https://support.apple.com/guide/safari/print-a-webpage-ibrw1051/mac)
- [Puppeteer PDF API](https://pptr.dev/api/puppeteer.page.pdf)

---

**Last Updated**: 2026-02-22
**Maintained By**: Technical Team
**Next Review**: After Phase 2 completion
