# Design Resources & Artifacts

**Parent Document:** [Design Philosophy](03-Design-Philosophy.md)

---

## Design Artifacts

### Component Examples

**Button (Blonix):**
```css
.button-primary {
  background: var(--primary-500); /* #d946ef */
  color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.button-primary:hover {
  background: var(--primary-700); /* #a21caf */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

**Card (Blonix):**
```css
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

```
 
 ### Logo Guidelines
 
 **Transparency:**
 - Always use PNG or SVG formats with transparent backgrounds.
 - Avoid white boxes around the logo on colored backgrounds.
 
 **Sizing & Balance:**
 - **Size:** Large enough to be recognized, but never larger than the primary headline or CTA.
 - **Balance:** Ensure the logo doesn't overpower the page content. It's a signature, not the headline.
 
 ---

## Resources

**Design Files:**
- [Figma File](link-to-figma) - Blonix component library
- [Color Palette](../04-design-system/design-tokens.md) - Complete color system
- [Typography](../04-design-system/design-tokens.md#typography) - Type specs

**Related Documentation:**
- [Design System](../04-design-system/README.md)
- [Component Library](../04-design-system/component-library.md)
- [Accessibility Guide](../04-design-system/accessibility.md)

---

**Questions or Concerns?** Contact Design Team
**Last Review:** 2025-11-23
**Next Review:** 2025-12-23
