# Lovable to AITCH Rebranding Guide

This document outlines the steps taken to rebrand the original Lovable template to the AITCH ERC-1155 Smart Contract Interface. These changes were necessary to remove all traces of the original Lovable branding and ensure a consistent brand identity for the AITCH project.

## Branding Elements Changed

### 1. Open Graph Image

The original template included a Lovable-branded Open Graph image that appeared in social media shares and link previews. We:

- Created a new custom Open Graph image with AITCH branding
- Updated the image dimensions to 1200×630 pixels (optimal for social sharing)
- Used the project's blue color scheme (#3b82f6)
- Added cache-busting parameters to ensure platforms refresh their cached images

```html
<!-- Updated Open Graph / Facebook metadata -->
<meta property="og:image" content="./og-image.png?v=2" />

<!-- Updated Twitter Card metadata -->
<meta property="twitter:image" content="./og-image.png?v=2" />
```

### 2. Favicon Package

The original template used a heart icon (Lovable branding) in browser tabs. We:

- Created a comprehensive favicon package with a blue "H" letter icon
- Generated multiple sizes for different platforms:
  - favicon-16x16.png
  - favicon-32x32.png
  - apple-touch-icon.png (180×180)
  - android-chrome-192x192.png
  - android-chrome-512x512.png
  - mstile-150x150.png
  - favicon.ico
- Added supporting configuration files:
  - site.webmanifest
  - browserconfig.xml
- Updated HTML head with proper references and cache-busting:

```html
<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png?v=2" />
<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png?v=2" />
<link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png?v=2" />
<link rel="manifest" href="./site.webmanifest?v=2" />
<link rel="mask-icon" href="./favicon.png?v=2" color="#3b82f6" />
<link rel="shortcut icon" href="./favicon.ico?v=2" />
<meta name="msapplication-TileColor" content="#3b82f6" />
<meta name="msapplication-config" content="./browserconfig.xml?v=2" />
<meta name="theme-color" content="#3b82f6" />
```

### 3. Site Title and Description

Updated all site metadata to reflect the AITCH branding:

```html
<title>ERC-1155 Smart Contract Interface</title>
<meta name="description" content="A Web3 interface for interacting with ERC-1155 smart contracts" />
<meta name="author" content="Sean Corcoran" />
```

### 4. URL References

Updated all URL references to point to the AITCH domain:

```html
<meta property="og:url" content="https://aitchtestsite.com/" />
<meta property="twitter:url" content="https://aitchtestsite.com/" />
```

## Technical Implementation

### Tools Used

- Node.js Canvas library for generating custom favicon and OG images
- Git for version control and deployment
- Vercel for hosting and deployment

### Implementation Process

1. **Image Generation**:
   - Used Node.js Canvas to programmatically create branded images
   - Maintained consistent color scheme across all assets

2. **Metadata Updates**:
   - Modified HTML head section with updated metadata
   - Added cache-busting parameters to force refresh of cached assets

3. **Deployment**:
   - Committed changes to Git repository
   - Pushed to GitHub
   - Triggered Vercel deployment via webhook

## Verification

After implementing these changes, we verified that:

1. Browser tabs show the blue "H" icon instead of the heart icon
2. Social media shares display the new Open Graph image
3. All references to "Lovable" have been removed from the codebase
4. The site maintains a consistent AITCH brand identity

## Future Considerations

When making future updates to the site, be aware of:

1. Cache-busting may be needed when updating visual assets
2. Maintain the blue color scheme (#3b82f6) for brand consistency
3. Use "H" as the icon letter for any new branded assets
