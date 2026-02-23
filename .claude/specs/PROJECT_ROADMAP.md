# CV Portfolio - Project Roadmap
**Print-Perfect Resume & Portfolio Site**

---

## 📋 Executive Summary

**Project**: Personal portfolio website built with Astro
**Primary Goal**: Create a minimal, high-performance static site that functions as both a web portfolio and a print-perfect resume
**Target Output**: Professional PDF resume via browser print (Ctrl+P / Cmd+P)
**Framework**: Astro 5.1.1
**Design Philosophy**: Minimalist, performance-first, print-optimized

---

## 🔍 Current State Audit

### ✅ Strengths
- Clean component architecture with good separation of concerns
- Data-driven design using JSON Resume format (`cv.json`)
- Minimal dependencies (only Astro core)
- Responsive layout with semantic HTML
- Well-organized section components (Hero, About, Experience, Education, Skills)
- Custom icon components for social links and skills
- Git-based workflow with CI/CD (GitHub Actions)

### ⚠️ Issues & Gaps

#### Critical Issues
1. **Minimal Print Styles**: Only basic font change in `@media print` (Layout.astro:74-76)
2. **No Print Layout Control**: Missing page breaks, margins, spacing adjustments
3. **No Element Visibility Control**: Interactive elements (links, buttons) not optimized for print
4. **Broken Skills Section**: Skills.astro (lines 11-19) has incomplete rendering logic
5. **Typography Typo**: "systen-ui" should be "system-ui" (Layout.astro:46)

#### Data Quality Issues
1. **Incomplete cv.json data**:
   - Empty skills object (line 138-139)
   - Placeholder volunteer data
   - Placeholder awards, certificates, publications
   - Generic project data
   - Placeholder highlights in work experience

#### Missing Features
1. No PDF testing workflow
2. No print preview optimization
3. Projects section commented out
4. No single-page layout strategy
5. No color-to-grayscale conversion for print

---

## 🎯 Project Goals

### Primary Goals
1. **Print-Perfect PDF Output**: Professional resume that prints perfectly on A4/Letter paper
2. **Single-Page Optimization**: Fit all essential content on one page when printed
3. **Professional Typography**: Print-optimized fonts, sizes, and spacing
4. **Clean Data Structure**: Complete and accurate cv.json data

### Secondary Goals
1. **Performance**: Lighthouse score 95+ across all metrics
2. **Accessibility**: WCAG AA compliance
3. **SEO Optimization**: Proper meta tags, structured data
4. **Responsive Design**: Perfect on all screen sizes

---

## 🗺️ Development Roadmap

### Phase 1: Foundation & Data Cleanup
**Priority**: High | **Effort**: 2-3 hours

#### Tasks
- [ ] **1.1 Fix Critical Bugs**
  - Fix Skills.astro rendering logic
  - Fix "systen-ui" typo in Layout.astro
  - Verify all component imports and data mapping

- [ ] **1.2 Clean cv.json Data**
  - Complete skills section with actual technologies
  - Remove or complete placeholder sections (volunteer, awards, certificates)
  - Refine work experience highlights
  - Add real project data or remove section
  - Validate all dates and URLs

- [ ] **1.3 Content Audit**
  - Review all text for grammar and clarity
  - Ensure consistency in tone and formatting
  - Optimize summary/about text for brevity

**Deliverables**:
- Fully functional components
- Clean, accurate data
- No console errors or warnings

---

### Phase 2: Print CSS Architecture
**Priority**: High | **Effort**: 4-6 hours

#### Tasks
- [ ] **2.1 Create Print-Specific Styles**
  - Add comprehensive `@media print` rules to Layout.astro
  - Control page breaks (`page-break-before`, `page-break-after`, `break-inside`)
  - Adjust margins for print (0.5in recommended)
  - Set optimal print font sizes (10-11pt for body, 14-16pt for headings)

- [ ] **2.2 Element Visibility Control**
  - Hide decorative elements (hover effects, animations)
  - Convert link colors to black/dark gray
  - Show link URLs for important links (using `a::after { content: " (" attr(href) ")"; }`)
  - Hide navigation if present
  - Hide KeyboardManager component

- [ ] **2.3 Layout Optimization**
  - Reduce padding from 4rem to print-friendly values
  - Adjust section spacing for single-page layout
  - Optimize Hero section for print (smaller image, compact layout)
  - Remove unnecessary whitespace
  - Ensure content fits on one page (use `max-height` tests)

- [ ] **2.4 Typography for Print**
  - Use print-safe fonts (Arial, Times New Roman, Georgia)
  - Adjust line-height for readability (1.3-1.5)
  - Optimize heading hierarchy
  - Ensure sufficient contrast for grayscale printing

**Technical Specifications**:
```css
@media print {
  /* Page setup */
  @page {
    size: A4; /* or Letter */
    margin: 0.5in;
  }

  /* Reset for print */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #000;
  }

  /* Hide interactive elements */
  nav, button, .no-print {
    display: none !important;
  }

  /* Optimize sections */
  section {
    page-break-inside: avoid;
    margin-bottom: 0.5rem;
  }

  /* Links */
  a {
    color: #000;
    text-decoration: none;
  }

  /* Compact hero */
  .hero img {
    width: 64px;
    height: 64px;
  }
}
```

**Deliverables**:
- Complete print stylesheet
- Single-page PDF output
- Professional print appearance

---

### Phase 3: Print Testing & Refinement
**Priority**: High | **Effort**: 2-3 hours

#### Tasks
- [ ] **3.1 Create Print Testing Workflow**
  - Document print testing procedure in `.claude/skills/print-test.md`
  - Test in Chrome, Firefox, Safari
  - Test on different paper sizes (A4, Letter)
  - Verify PDF generation

- [ ] **3.2 Visual Refinement**
  - Ensure proper alignment and spacing
  - Check for orphaned text or awkward breaks
  - Verify all content is visible and legible
  - Test grayscale appearance

- [ ] **3.3 Content Optimization**
  - Ensure all critical information fits on page 1
  - Consider two-column layout if needed for space
  - Prioritize content (move less important sections to page 2 if necessary)

**Testing Checklist**:
```markdown
- [ ] Page fits on single sheet (A4/Letter)
- [ ] All text is legible (10pt minimum)
- [ ] No content cut off at edges
- [ ] Proper spacing between sections
- [ ] Contact information prominent
- [ ] Dates formatted consistently
- [ ] No overlapping elements
- [ ] Links either hidden or printed inline
- [ ] Professional appearance in grayscale
- [ ] PDF file size < 500KB
```

**Deliverables**:
- Print testing documentation
- Validated PDF output
- Cross-browser compatibility

---

### Phase 4: Web Experience Polish
**Priority**: Medium | **Effort**: 3-4 hours

#### Tasks
- [ ] **4.1 Enhanced Web Styles**
  - Add smooth scrolling
  - Improve hover states
  - Add subtle animations (fade-in on load)
  - Enhance responsive breakpoints

- [ ] **4.2 Performance Optimization**
  - Optimize image loading (lazy load, proper formats)
  - Minimize CSS
  - Add preconnect for external resources
  - Check Lighthouse scores

- [ ] **4.3 SEO & Meta Tags**
  - Add proper meta description
  - Add Open Graph tags
  - Add Twitter Card tags
  - Add JSON-LD structured data
  - Create robots.txt and sitemap.xml

- [ ] **4.4 Accessibility**
  - Ensure proper heading hierarchy
  - Add ARIA labels where needed
  - Test keyboard navigation
  - Verify color contrast ratios

**Deliverables**:
- Polished web experience
- Lighthouse score 95+
- SEO optimization complete

---

### Phase 5: Advanced Features (Optional)
**Priority**: Low | **Effort**: 4-6 hours

#### Tasks
- [ ] **5.1 Multi-Language Support**
  - Add i18n for Spanish/English
  - Update cv.json structure for translations

- [ ] **5.2 Theme Variations**
  - Add print theme selector (traditional, modern, compact)
  - Store theme preference in localStorage

- [ ] **5.3 PDF Generation**
  - Add automated PDF generation via Puppeteer
  - Create GitHub Action for PDF artifact
  - Version control PDFs

- [ ] **5.4 Analytics**
  - Add privacy-friendly analytics (Plausible/Fathom)
  - Track print actions

**Deliverables**:
- Enhanced features based on user needs
- Automated PDF generation pipeline

---

## 🛠️ Technical Architecture

### File Structure
```
cv_portfolio/
├── .claude/
│   ├── specs/
│   │   ├── PROJECT_ROADMAP.md (this file)
│   │   └── PRINT_REQUIREMENTS.md
│   └── skills/
│       ├── print-test.md
│       └── pdf-optimization.md
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Experience.astro
│   │   │   ├── Education.astro
│   │   │   ├── Skills.astro
│   │   │   └── Projects.astro
│   │   └── Section.astro
│   ├── layouts/
│   │   └── Layout.astro (global styles + print CSS)
│   ├── pages/
│   │   └── index.astro
│   └── cv.json (single source of truth for data)
└── public/
    └── favicon.svg
```

### Print CSS Strategy
1. **Mobile-first to print-first**: Adapt mobile layout patterns for print
2. **Component-level print styles**: Each component handles its own print optimization
3. **Global print reset**: Layout.astro provides base print styles
4. **Cascading specificity**: Use `!important` sparingly, prefer specificity

### Data Flow
```
cv.json → Astro components → HTML → Browser → PDF
```

---

## 📐 Design System

### Print Specifications

#### Spacing Scale
- **Sections**: 12pt (1rem) between major sections
- **Subsections**: 6pt (0.5rem) between items
- **Paragraphs**: 4pt (0.33rem) between lines

#### Typography Scale
- **Name/H1**: 18-20pt, bold
- **Job Title/H2**: 12-14pt, semi-bold
- **Section Headers/H3**: 11-12pt, bold
- **Body Text**: 10pt, regular
- **Meta Info (dates, locations)**: 9pt, regular

#### Color Palette (Print)
- **Primary Text**: #000000
- **Secondary Text**: #333333
- **Accent Text**: #666666
- **Borders**: #CCCCCC

#### Layout Grid
- **Margins**: 0.5in (all sides)
- **Content Width**: 7.5in (for Letter size)
- **Two-column option**: 3.5in per column + 0.5in gutter

---

## 🚀 Implementation Priority

### Week 1: Core Functionality
1. Fix Skills component ✅
2. Clean cv.json data ✅
3. Implement basic print CSS ✅
4. Test single-page layout ✅

### Week 2: Print Optimization
1. Refine print styles ✅
2. Cross-browser testing ✅
3. PDF validation ✅
4. Documentation ✅

### Week 3: Polish & Deploy
1. Web experience enhancements ✅
2. Performance optimization ✅
3. SEO implementation ✅
4. Final deployment ✅

---

## 📊 Success Metrics

### Print Quality
- ✅ Fits on single page (primary content)
- ✅ Professional appearance
- ✅ Readable at 10pt minimum
- ✅ Proper spacing and alignment
- ✅ No content cutoff

### Performance
- ✅ Lighthouse Performance: 95+
- ✅ Lighthouse Accessibility: 95+
- ✅ Lighthouse Best Practices: 95+
- ✅ Lighthouse SEO: 95+
- ✅ First Contentful Paint: < 1.5s

### Code Quality
- ✅ No console errors
- ✅ No TypeScript errors
- ✅ Valid HTML5
- ✅ Accessible (WCAG AA)

---

## 🎓 Learning Resources

### Print CSS
- [Print Stylesheet Best Practices](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)
- [A Guide To The State Of Print Stylesheets In 2018](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)
- [MDN: CSS Paged Media](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media)

### Astro
- [Astro Documentation](https://docs.astro.build/)
- [Astro Best Practices](https://docs.astro.build/en/concepts/why-astro/)

### JSON Resume
- [JSON Resume Schema](https://jsonresume.org/schema/)

---

## 📝 Notes & Considerations

### Browser Support
- **Chrome/Edge**: Full support for print CSS
- **Firefox**: Good support, test page breaks
- **Safari**: Some limitations with `@page` rules

### Print Gotchas
1. **Background colors**: Often disabled by default in browsers
2. **Flexbox/Grid**: Can behave differently in print
3. **SVGs**: May not print correctly in some browsers
4. **External fonts**: Ensure they load before print
5. **Page breaks**: Different browsers handle differently

### Alternative Approaches
If single-page layout is too constrained:
- **Option A**: Two-page resume (experience on page 2)
- **Option B**: Compact mode toggle (user chooses)
- **Option C**: Separate "full" and "brief" versions

---

## 🔄 Version History

- **v1.0** (2026-02-22): Initial roadmap created
- **v1.1** (TBD): After Phase 1 completion
- **v2.0** (TBD): After print optimization complete

---

## 👤 Stakeholders

- **Developer**: datorot93
- **Technical Architect**: Claude (Sonnet 4.5)
- **End Users**: Recruiters, hiring managers, professional contacts

---

## 📞 Next Steps

1. **Review this roadmap** with stakeholder
2. **Prioritize phases** based on timeline
3. **Start Phase 1**: Fix critical bugs and clean data
4. **Set up testing environment** for print validation
5. **Establish feedback loop** for iterations

---

**Status**: 🟡 Planning Complete - Ready for Development
**Last Updated**: 2026-02-22
**Next Review**: After Phase 1 completion
