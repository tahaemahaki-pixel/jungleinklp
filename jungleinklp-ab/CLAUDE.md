# Jungle Ink Tattoo - Coverup Landing Page (A/B Test Version)

## Overview
CRO-optimized version of the Jungle Ink coverup landing page for A/B testing against the original.

## Changes from Original

### 1. Unified CTAs
- All CTAs now say "Book Free Consult" (was mixed: "Enquire Now" / "Book Free Assessment")
- Consistent action language throughout

### 2. Urgency Elements
- Added urgency banner in hero: "Limited spots available for February"
- Animated pulse dot for attention

### 3. Phone Contact Option
- Added phone number: **0481 881 888**
- Call button in hero section
- Phone option in CTA section
- Footer phone link
- Sticky mobile CTA with call button

### 4. Sticky Mobile CTA
- Fixed bottom bar on mobile with two buttons:
  - "Call" (direct dial)
  - "Book Free Consult" (scrolls to form)

### 5. Exit Intent Popup
- Shows when mouse leaves viewport (desktop)
- One-time per session
- Phone CTA + form link options

### 6. FAQ Section
- 4 common questions with accordion
- Addresses objections before form:
  - Can any tattoo be covered up?
  - How much does a coverup cost?
  - What happens during the consultation?
  - How do I book?

### 7. Shortened About Section
- Cut from 3 paragraphs to 2
- More focused on client benefits
- Added 4th feature: "Free Initial Consultation"
- Added CTA button at end

### 8. Form Improvements
- Added phone number field
- Side-by-side name/phone on desktop
- Better placeholder text
- Added reassurance note below form
- Contact options (phone vs form) displayed above form

### 9. Gallery CTA
- Added "Book Your Free Consult" button after gallery

### 10. Footer Improvements
- Added phone number
- Extra padding for sticky CTA clearance

### 11. WhatsApp Chat Button
- Floating green WhatsApp button (bottom-right)
- Pre-filled message: "Hi, I'm interested in a coverup consultation"
- Hover tooltip: "Chat with us"
- Positioned above sticky CTA on mobile
- Links to wa.me/61481881888

## Form Configuration
- **Service:** Web3Forms
- **Access Key:** `17d9ca8c-4fce-45e2-8a77-08cc7145c5e4`
- **Subject:** "New Coverup Enquiry - Jungle Ink (AB Test)" (marked for tracking)
- **Phone:** 0481 881 888

## File Structure
```
jungleinklp-ab/
├── index.html      # CRO-optimized landing page
├── style.css       # Updated styles with new components
├── script.js       # Added FAQ accordion, exit popup
├── assets/         # Same images as original
└── CLAUDE.md       # This file
```

## Testing Checklist
- [ ] Urgency banner displays correctly
- [ ] Phone links work (tel:+61481881888)
- [ ] Sticky CTA shows on mobile only
- [ ] FAQ accordion opens/closes
- [ ] Exit popup shows once on mouse leave (desktop)
- [ ] Form submits with phone field
- [ ] All CTAs scroll to #book section
- [ ] WhatsApp button visible and clickable
- [ ] WhatsApp opens with pre-filled message
- [ ] WhatsApp button positioned above sticky CTA on mobile

## Metrics to Track
Compare against original:
- Form submission rate
- Phone calls (if trackable)
- Time on page
- Scroll depth
- Exit popup conversion

## Deployment
Deploy to separate URL for A/B testing (e.g., test.jungleinktattoo.com.au or via Vercel preview)
