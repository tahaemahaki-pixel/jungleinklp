# Jungle Ink Tattoo - Coverup Landing Page

## Overview
Landing page for Jungle Ink Tattoo's coverup specialist, Albatross.

## Live URLs
- **Production:** https://jungleinktattoo.com.au
- **Alternate:** https://coverup.jungleinktattoo.com.au (same site)

## Hosting
- **Platform:** Vercel
- **Repo:** https://github.com/tahaemahaki-pixel/jungleinklp
- **Deployment:** Auto-deploys on push to `main`

## Form Configuration (Web3Forms)
- **Service:** Web3Forms (https://web3forms.com)
- **Access Key:** `17d9ca8c-4fce-45e2-8a77-08cc7145c5e4`
- **Email Subject:** "New Coverup Enquiry - Jungle Ink"
- **From Name:** "Jungle Ink Website"
- **Redirect:** https://jungleinktattoo.com.au/

## Social Links
- **Instagram:** https://www.instagram.com/jungleinktattoo/
- **Facebook:** https://www.facebook.com/share/1AHwXi2roy/?mibextid=wwXIfr

## File Structure
```
jungleinklp/
├── index.html      # Main landing page
├── style.css       # Styles
├── script.js       # Scroll animations, form handling
└── assets/         # Images
```

## DNS Setup
- **Domain:** jungleinktattoo.com.au
- **Type:** Configured via Vercel

---

## Form Issues & Fixes (Jan 2025)

### Problem
Form submissions were not reaching web3forms inbox. The form appeared to work (showed "Enquiry Sent!" message) but no actual data was being submitted to the web3forms API.

### Root Causes Identified

#### Issue 1: Missing Form ID
- Form element was missing `id="enquiry-form"` attribute
- JavaScript was using `querySelector('.booking-form')` instead of `getElementById()`
- Made code inconsistent with working reference implementation (jungleinklp-hyper)

#### Issue 2: Missing Status Feedback Element
- No `<div id="form-status">` for displaying server responses
- Users couldn't see error messages if submission failed
- No way to debug API errors

#### Issue 3: Poor Error Handling
- JavaScript didn't properly parse web3forms API response format
- Button state changes but no message displayed
- Console errors weren't being shown to users

### Solution Applied

Updated both `index.html` and `script.js` to match the working implementation from jungleinklp-hyper.

#### HTML Changes (index.html line 201, 217)
```html
<!-- BEFORE -->
<form class="booking-form" method="POST" action="https://api.web3forms.com/submit">
    <!-- fields -->
    <button type="submit" class="btn btn-primary">Enquire Now</button>
</form>

<!-- AFTER -->
<form id="enquiry-form" class="booking-form" method="POST" action="https://api.web3forms.com/submit">
    <!-- fields -->
    <button type="submit" class="btn btn-primary">Enquire Now</button>
    <div id="form-status" class="form-status"></div>
</form>
```

#### JavaScript Changes (script.js lines 19-70)
```javascript
// BEFORE - Broken Implementation
const form = document.querySelector('.booking-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // ... hardcoded fetch URL, no error display
    });
}

// AFTER - Working Implementation
const form = document.getElementById('enquiry-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(form);
        const action = form.getAttribute('action');

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                formStatus.innerText = "Thank you! Your enquiry has been sent. We'll be in touch soon.";
                formStatus.style.color = "#4CAF50";
                formStatus.style.marginTop = "1rem";
                form.reset();
                btn.innerText = 'Sent!';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            } else {
                formStatus.innerText = data.message || "Oops! There was a problem submitting your form";
                formStatus.style.color = "#ff4d4d";
                formStatus.style.marginTop = "1rem";
                btn.innerText = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            formStatus.innerText = "Oops! There was a problem connecting to the server.";
            formStatus.style.color = "#ff4d4d";
            formStatus.style.marginTop = "1rem";
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}
```

### Key Implementation Details

1. **Form ID**: Must use `id="enquiry-form"` for JavaScript to find it
2. **Status Div**: `<div id="form-status">` displays success/error messages to users
3. **Dynamic Action URL**: Gets action URL from form attribute instead of hardcoding
4. **Response Parsing**: Checks `data.success` property from web3forms response
5. **Error Display**: Shows error messages to users via formStatus element
6. **Button State**: Properly resets button text and disabled state after submission

### Reference Implementation
The working code is based on **jungleinklp-hyper** repository:
- Repo: https://github.com/tahaemahaki-pixel/jungleinklp-hyper
- Live: https://hyper.jungleinktattoo.com.au
- This implementation was tested and confirmed working

### Testing Checklist
- [ ] Form submits without JavaScript errors in console
- [ ] Success message appears: "Thank you! Your enquiry has been sent..."
- [ ] Email received in web3forms configured inbox
- [ ] Error messages display if submission fails
- [ ] Button shows "Sending..." then "Sent!" states
- [ ] Form resets after successful submission

### Debugging Tips
1. Open browser DevTools console while testing
2. Check Network tab for POST request to `api.web3forms.com/submit`
3. Verify response has `{"success": true}` in Preview tab
4. Check web3forms dashboard: https://web3forms.com/dashboard
5. Verify access key is active and not rate-limited
6. Check spam folder for submission emails
