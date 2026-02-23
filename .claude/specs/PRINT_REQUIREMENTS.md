# Print Requirements Specification
**CV Portfolio - Print-to-PDF Perfect Resume**

---

## 📄 Document Purpose

This document defines the technical requirements for generating a print-perfect PDF resume from the Astro portfolio website. All print functionality must meet these specifications.

---

## 🎯 Core Requirements

### PR-001: Single Page Layout
**Priority**: CRITICAL
**Description**: All essential resume content must fit on a single A4 or Letter-sized page when printed.

**Acceptance Criteria**:
- Content fits within printable area (minus margins)
- No orphaned sections on page 2
- All critical information visible without scrolling/page turning
- Content remains readable at minimum 10pt font size

**Testing**: Print preview in Chrome, Firefox, Safari - verify single page

---

### PR-002: Professional Typography
**Priority**: HIGH
**Description**: Text must be crisp, professional, and readable in both digital and printed formats.

**Acceptance Criteria**:
- Minimum font size: 10pt for body text
- Minimum font size: 14pt for headings
- Line height: 1.3-1.5 for optimal readability
- Font families: System fonts or web-safe fonts
- No pixelated or blurry text

**Font Stack** (Print):
```css
font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
```

**Testing**: Print at actual size, verify readability at arm's length

---

### PR-003: Proper Page Margins
**Priority**: HIGH
**Description**: Adequate margins to prevent content cutoff on various printers.

**Acceptance Criteria**:
- Top margin: 0.5in minimum
- Bottom margin: 0.5in minimum
- Left margin: 0.5in minimum
- Right margin: 0.5in minimum
- No content within 0.25in of page edges

**Implementation**:
```css
@page {
  size: A4; /* or Letter */
  margin: 0.5in;
}
```

**Testing**: Print on actual printer, verify no cutoff

---

### PR-004: Color to Grayscale
**Priority**: MEDIUM
**Description**: Design must work in both color and grayscale (black & white printing).

**Acceptance Criteria**:
- All text readable in grayscale
- Sufficient contrast ratios (4.5:1 minimum)
- No reliance on color to convey information
- Borders/dividers visible in grayscale

**Testing**: Print preview in grayscale mode

---

### PR-005: Hide Interactive Elements
**Priority**: HIGH
**Description**: Interactive web elements must be hidden or adapted for print.

**Elements to Hide**:
- Navigation menus
- Buttons
- Hover effects
- Animations
- Scroll indicators
- KeyboardManager component
- Any JavaScript-dependent features

**Implementation**:
```css
@media print {
  nav, button, .interactive, .no-print {
    display: none !important;
  }
}
```

**Testing**: Verify no orphaned interactive elements in print preview

---

### PR-006: Link Handling
**Priority**: MEDIUM
**Description**: Links must be handled appropriately for print medium.

**Options**:
1. **Remove underlines** (cleaner look)
2. **Print URLs inline** for important links
3. **Hide less important URLs**

**Recommended Approach**:
```css
@media print {
  /* Remove underlines from all links */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Show URLs for email and important external links */
  a[href^="mailto:"]::after,
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Hide URLs for internal links */
  a[href^="#"]::after {
    content: "";
  }
}
```

**Testing**: Verify links are readable and URLs shown where appropriate

---

### PR-007: Page Break Control
**Priority**: HIGH
**Description**: Prevent awkward page breaks that split related content.

**Acceptance Criteria**:
- Section headers never orphaned at bottom of page
- Work experience items not split across pages
- Education items not split across pages
- Maintain logical content grouping

**Implementation**:
```css
@media print {
  /* Avoid breaks inside these elements */
  section, article, .experience-item, .education-item {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Always break before these */
  h2 {
    page-break-before: auto;
    page-break-after: avoid;
  }

  /* Keep related content together */
  h3 + p, h3 + ul {
    page-break-before: avoid;
  }
}
```

**Testing**: Print multi-page test, verify no awkward breaks

---

### PR-008: Image Optimization
**Priority**: MEDIUM
**Description**: Images must be optimized for print quality and file size.

**Acceptance Criteria**:
- Profile image: 300dpi equivalent or vector
- Maximum image size: 2in x 2in for profile
- Images load before print dialog
- No placeholder images in print
- Total PDF size < 500KB

**Recommended Sizes**:
- **Profile photo**: 600px x 600px (prints at 2in x 2in)
- **Icons**: SVG preferred (infinitely scalable)

**Implementation**:
```css
@media print {
  .profile-image {
    width: 64px;
    height: 64px;
    border-radius: 8px;
  }
}
```

**Testing**: Verify image quality in printed PDF

---

### PR-009: PDF Metadata
**Priority**: LOW
**Description**: Generated PDF should have proper metadata.

**Desired Metadata**:
- Title: "[Your Name] - Resume"
- Author: "[Your Name]"
- Subject: "Software Developer Resume"
- Keywords: "software, developer, resume, cv"

**Note**: This is controlled by browser print settings and `<title>` tag

**Testing**: Open generated PDF, check properties

---

### PR-010: Cross-Browser Compatibility
**Priority**: HIGH
**Description**: Print output must be consistent across major browsers.

**Browsers to Support**:
- ✅ Chrome/Chromium (primary)
- ✅ Firefox
- ✅ Safari (macOS)
- ✅ Edge

**Known Issues**:
- Safari has limited `@page` support
- Firefox may handle flexbox differently in print
- Some browsers disable background colors by default

**Testing**: Print from each browser, document differences

---

## 📐 Layout Specifications

### Page Dimensions

#### A4 (International)
- Width: 210mm (8.27in)
- Height: 297mm (11.69in)
- Printable area (with 0.5in margins): 7.27in x 10.69in

#### Letter (US)
- Width: 8.5in (215.9mm)
- Height: 11in (279.4mm)
- Printable area (with 0.5in margins): 7.5in x 10in

**Recommendation**: Design for Letter size (smaller printable area), will work for A4

---

### Content Density

**Maximum content per page**:
- Hero section: ~15% of page
- About/Summary: ~10% of page
- Experience: ~40% of page (3-5 positions)
- Education: ~15% of page
- Skills: ~15% of page
- Footer/Contact: ~5% of page

**Total**: ~100% of page (adjust as needed)

---

### Spacing System (Print)

```css
/* Spacing scale optimized for print */
--space-xs: 2pt;   /* 0.167rem */
--space-sm: 4pt;   /* 0.333rem */
--space-md: 6pt;   /* 0.5rem */
--space-lg: 8pt;   /* 0.667rem */
--space-xl: 12pt;  /* 1rem */
--space-2xl: 16pt; /* 1.333rem */
```

**Usage**:
- Between sections: `--space-xl` (12pt)
- Between items in list: `--space-md` (6pt)
- Between paragraphs: `--space-sm` (4pt)
- Line spacing: 1.4 multiplier

---

## 🎨 Visual Design Requirements

### Typography Hierarchy

```css
/* Print typography system */
h1 {
  font-size: 18pt;
  font-weight: 700;
  margin-bottom: 4pt;
}

h2 {
  font-size: 14pt;
  font-weight: 600;
  margin-bottom: 6pt;
}

h3 {
  font-size: 11pt;
  font-weight: 600;
  margin-bottom: 4pt;
}

p, li {
  font-size: 10pt;
  line-height: 1.4;
}

.meta-info {
  font-size: 9pt;
  color: #666;
}
```

---

### Color Specifications

**Print Color Palette**:
```css
/* Grayscale-safe colors */
--text-primary: #000000;
--text-secondary: #333333;
--text-tertiary: #666666;
--border-color: #CCCCCC;
--background: #FFFFFF;
```

**Contrast Ratios** (WCAG AA):
- Primary text: 21:1 (black on white)
- Secondary text: 12.6:1 (#333 on white)
- Tertiary text: 5.7:1 (#666 on white)

---

## 🧪 Testing Requirements

### Print Testing Checklist

```markdown
#### Page Layout
- [ ] Content fits on single page
- [ ] Margins are consistent (0.5in all sides)
- [ ] No content cutoff at edges
- [ ] Proper whitespace distribution

#### Typography
- [ ] All text readable at 10pt minimum
- [ ] Font weights render correctly
- [ ] Line spacing is comfortable (1.3-1.5)
- [ ] No font loading issues

#### Visual Elements
- [ ] Profile image renders correctly
- [ ] Icons display properly (or are hidden)
- [ ] Borders and dividers visible
- [ ] Proper alignment throughout

#### Content
- [ ] All sections present and complete
- [ ] Dates formatted consistently
- [ ] No placeholder text
- [ ] URLs shown/hidden as appropriate

#### Print Quality
- [ ] Clear text in grayscale
- [ ] No pixelation or blur
- [ ] Professional appearance
- [ ] Consistent spacing

#### Cross-Browser
- [ ] Chrome print preview looks correct
- [ ] Firefox print preview looks correct
- [ ] Safari print preview looks correct
- [ ] Edge print preview looks correct

#### PDF Output
- [ ] PDF file size < 500KB
- [ ] Selectable text (not image)
- [ ] Proper metadata
- [ ] Links functional (if applicable)
```

---

### Test Cases

#### TC-001: Basic Print Test
1. Open portfolio in browser
2. Press Ctrl+P / Cmd+P
3. Verify single page layout
4. Check all content visible
5. Generate PDF

**Expected Result**: Clean, professional single-page PDF

---

#### TC-002: Grayscale Test
1. Open portfolio in browser
2. Press Ctrl+P / Cmd+P
3. Select "Black and white" or "Grayscale"
4. Preview output

**Expected Result**: All content readable in grayscale

---

#### TC-003: Cross-Browser Test
1. Open portfolio in Chrome, Firefox, Safari
2. Print preview in each
3. Compare outputs
4. Document differences

**Expected Result**: Consistent output across browsers (minor variations acceptable)

---

#### TC-004: Different Paper Sizes
1. Print preview with A4 setting
2. Print preview with Letter setting
3. Compare layouts

**Expected Result**: Content fits on both paper sizes

---

#### TC-005: Link Handling Test
1. Print preview
2. Verify email links show address
3. Verify social links show URLs or are hidden
4. Check for broken link formatting

**Expected Result**: Links handled appropriately for print

---

## 🚨 Common Print Issues & Solutions

### Issue 1: Content Overflows to Second Page
**Symptoms**: Content spills onto page 2 by small margin

**Solutions**:
- Reduce section spacing (gap between sections)
- Reduce font sizes slightly (10pt → 9.5pt)
- Reduce line-height (1.5 → 1.4)
- Use more compact hero layout
- Consider two-column layout for skills

---

### Issue 2: Backgrounds Not Printing
**Symptoms**: Background colors/images don't appear in print

**Cause**: Browser default setting to save ink

**Solutions**:
- Don't rely on backgrounds for critical information
- Use borders instead of backgrounds for emphasis
- Inform users to enable "Background graphics" in print settings

---

### Issue 3: Fonts Look Different in Print
**Symptoms**: Fonts render differently than screen

**Cause**: Font fallback or print-specific font substitution

**Solutions**:
- Use web-safe fonts for print
- Define explicit print font stack
- Test with actual printer

---

### Issue 4: Links Show Full URLs (Messy)
**Symptoms**: All links show long URLs, cluttering layout

**Solutions**:
- Selectively show URLs using `a[href^="http"]::after`
- Hide URLs for social media icons
- Show only email and critical links

---

### Issue 5: Page Breaks in Wrong Places
**Symptoms**: Sections split awkwardly across pages

**Solutions**:
- Use `page-break-inside: avoid` on sections
- Use `page-break-after: avoid` on headings
- Adjust content density to fit single page

---

## 📊 Performance Benchmarks

### PDF Generation Time
- **Target**: < 3 seconds from print dialog to PDF
- **Acceptable**: < 5 seconds

### PDF File Size
- **Target**: < 500KB
- **Maximum**: < 1MB

### Print Rendering
- **Target**: No layout shift when opening print preview
- **Acceptable**: Minimal shift (< 10px)

---

## 🔄 Review & Updates

This document should be reviewed:
- After each phase of implementation
- When print issues are discovered
- When browser updates affect print
- At least once per quarter

---

**Document Version**: 1.0
**Last Updated**: 2026-02-22
**Next Review**: After Phase 2 completion
**Owner**: Technical Architect (Claude Sonnet 4.5)
