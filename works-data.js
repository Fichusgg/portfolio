/**
 * works-data.js
 * ─────────────
 * Single source of truth for all portfolio projects.
 * 
 * HOW TO ADD A NEW PROJECT:
 *   1. Copy one object block below.
 *   2. Fill in the fields.
 *   3. Done — it appears on the grid and gets its own detail page automatically.
 * 
 * IMAGE PLACEHOLDERS:
 *   All image fields are currently empty strings "".
 *   The site renders a grey placeholder block when empty.
 *   To use a real image, replace "" with a path like "images/myimage.jpg"
 * 
 * FIELD REFERENCE:
 *   id              → URL slug. Used in work.html?id=<this>. No spaces, lowercase.
 *   title           → Project name shown on cards and detail hero.
 *   industry        → Tag pill on the card (e.g. "Real Estate").
 *   year            → Tag pill on the card (e.g. "2024").
 *   thumb           → Image for grids (works page). Use the *Thumb file.
 *   heroImage       → Full-bleed hero on the detail page.
 *   introText       → Paragraph in the intro block.
 *   deliverables    → Array of strings listed under "Deliverables".
 *   meta            → Object with key/value pairs shown as pills (client, year, etc.).
 *   images          → Array of exactly 3 image URLs for the images section.
 *   nextPreviewImage → Optional. Image shown on the "Next work" teaser.
 *                      If empty, heroImage of the next project is used automatically.
 */

window.WORKS_DATA = [
    {
        id: "casa-malma",
        title: "Casa Malma Website",
        industry: "Real Estate",
        year: "2024",
        thumb: "images/Malma/malmaThumb.JPG",
        heroImage: "images/Malma/malmaThumb.JPG",
        introText: "Built a production website for a real business with a focus on clarity, speed, and not overdesigning. I handled structure, layout, and responsiveness, learning how real constraints and client needs matter more than flashy visuals.",
        deliverables: ["Website Design"],
        meta: {
            "Year": "2024",
            "Client": "Casa Malma"
        },
        images: ["images/Malma/Malma1.png", "images/Malma/Malma2.png", "images/Malma/Malma3.png"],
        nextPreviewImage: ""
    },
    {
        id: "onfocus",
        title: "OnFocus",
        industry: "Education",
        year: "2024",
        thumb: "images/On/onfocusThumb.png",
        heroImage: "images/On/onfocusThumb.png",
        introText: "Designed and developed a SwiftUI app in Xcode, owning both UX and logic. The project started rough and exposed my weak points in state management and data flow, but it forced me to improve structure, simplify decisions, and think like a product, not just a coder.",
        deliverables: ["App Design", "iOS Development"],
        meta: {
            "Year": "2024",
            "Client": "OnFocus"
        },
        images: ["images/On/On5.png", "images/On/On6.png", "images/On/On7.png"],
        nextPreviewImage: ""
    },
    {
        id: "selvaggio",
        title: "Selvaggio Website",
        industry: "Restaurant",
        year: "2025",
        thumb: "images/Selva/selvaggioThumb.jpg",
        heroImage: "images/Selva/selvaggioThumb.jpg",
        introText: "Created a website focused on stronger visual identity and layout decisions. This project pushed my design skills and made it clear where my taste is improving and where it still needs work, especially in hierarchy and spacing.",
        deliverables: ["Website Design", "UX / UI Design, CMS Integration"],
        meta: {
            "Year": "2025",
            "Client": "Selvaggio"
        },
        images: ["images/Selva/Selva1.png", "images/Selva/Selva2.png", "images/Selva/SelvaCMS.png"],
        nextPreviewImage: ""
    },
    {
        id: "civic-report",
        title: "Civic Report App",
        industry: "Service",
        year: "2025",
        thumb: "images/Civic/civicAppThumb.jpg",
        heroImage: "images/Civic/civicAppThumb.jpg",
        introText: "Started as a civic app design that won first place in a design contest. I am now trying to turn it into a real AI powered product, which has been far harder than the design itself and highlighted the gap between a winning concept and a usable, scalable application.",
        deliverables: ["App Design", "iOS Development", "UX / UI Design"],
        meta: {
            "Year": "2025",
            "Client": "City of Stockholm"
        },
        images: ["images/Civic/Civic1.jpg", "images/Civic/Civic3.jpg", "images/Civic/Civic4.jpg"],
        nextPreviewImage: ""
    },
    {
        id: "cohen",
        title: "Cohen",
        industry: "Museum Volunteer Project",
        year: "2024",
        thumb: "images/Cohen/cohenThumb.png",
        heroImage: "images/Cohen/cohenThumb.png",
        introText: "Volunteered to generate a website with minimal direction, which turned into an exercise in dealing with ambiguity. It taught me how unclear requirements slow everything down and why asking the right questions is as important as writing code.",
        deliverables: ["Framer Development", "Website Design"],
        meta: {
            "Year": "2024",
            "Client": "Cohen"
        },
        images: ["images/Cohen/Cohen1.png", "images/Cohen/Cohen2.png", ""],
        nextPreviewImage: ""
    }
];
