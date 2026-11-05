NEXTYSTUDIO — GITHUB PAGES STARTER

FILES
- index.html: website structure
- style.css: responsive design and animations
- script.js: product catalog, category filters, search, WhatsApp order

PUBLISH ON GITHUB PAGES
1. Create a new GitHub repository (for example: nextystudio).
2. Upload index.html, style.css, and script.js to the repository root.
3. Open Settings > Pages.
4. Under Build and deployment, choose "Deploy from a branch".
5. Select branch "main" and folder "/ (root)", then Save.
6. Wait for GitHub Pages to publish your website.

CUSTOMIZE PRICES AND PRODUCTS
Open script.js and edit the products array near the top.
For each product, change:
- name: product title
- description: product details
- price: displayed price (example: "Rp 25.000" or "PM")
- badge: stock label (example: "AVAILABLE" or "SOLD OUT")
- category: "account" or "bytecoin"

When prices change, edit script.js and upload/commit the updated file to GitHub.
GitHub Pages will publish the updated price after deployment.

WHATSAPP
Order buttons are configured for the WhatsApp number supplied by the owner.
To change it later, edit WHATSAPP_NUMBER near the top of script.js.
Use country code format, without +, spaces, or dashes.

IMPORTANT
This is a static front-end starter. Product changes are made by editing script.js and uploading the updated file to GitHub.
It does not include secure customer login, shared database, payment gateway, or a protected admin dashboard.
The motion effects respect the visitor's reduced-motion accessibility setting.
