---

# 🌐 Friedrich Faraji – Portfolio (Angular)

A modern, responsive **frontend portfolio** built with **Angular 20**, **TypeScript**, and **SCSS**.  
It showcases clean architecture, bilingual support, and a design language inspired by minimalism and precision.

---

## 🚀 Project Overview

This portfolio website presents the work, skills, and personality of **Friedrich Faraji** – a frontend developer with a passion for modern web technologies and scalable UI design.

The project was developed as part of the **Developer Akademie** Full-Stack Web Developer training.

### 🧩 Core Features

- 🌍 **Bilingual (DE / EN)** – powered by `@ngx-translate/core`
- 💅 **Custom SCSS design system** – variables, mixins, and responsive breakpoints
- 🧠 **Component-based structure** (Angular 20.3.5)
- 📱 **Fully responsive layout** using `flexbox`, `grid`, and `clamp()`
- 🧭 **Smooth-scroll navigation** and animated hero buttons (marquee effect)
- 🔄 **Language toggle switch** (DE ↔ EN)
- 📬 **Contact form** using Angular Reactive Forms
- ⚖️ **Legal Notice / Impressum / Privacy Policy**
- 🚫 **NOINDEX setup** to keep the portfolio private from search engines
- 🧱 **Clean Git structure** with optimized `.gitignore`

---

## 🗂️ Folder Structure (Simplified)
src/
├── app/
│ ├── home/
│ ├── aboutme/
│ ├── skills/
│ ├── projects/
│ ├── valuation/
│ ├── contact/
│ ├── legal-notice/
│ └── shared/
│ ├── header/
│ ├── footer/
│ └── language-toggle/
├── assets/
│ └── img/
├── lang/
│ ├── de.json
│ └── en.json
└── styles/
├── variables.scss
├── mixins.scss
└── globals.scss

yaml
Code kopieren

---

## 🧑‍💻 Development

### 1. Installation

```bash
npm install
Make sure to use Node ≥ 20.x and Angular CLI ≥ 20.3.5.

2. Local Development Server
bash
Code kopieren
ng serve
Then open your browser at http://localhost:4200.
The app reloads automatically whenever you modify a file.

3. Code Scaffolding
bash
Code kopieren
ng generate component component-name
Example:

bash
Code kopieren
ng generate component pages/aboutme
For a full list of schematics:

bash
Code kopieren
ng generate --help
4. Build
bash
Code kopieren
ng build
Creates a production-optimized build in dist/.

5. Unit Tests
bash
Code kopieren
ng test
Runs tests with Karma.

🧭 Deployment
Prepared for deployment on GitHub Pages or Vercel.
During development or private demos, use a subdomain with NOINDEX meta tag to keep it out of Google Search.

🧠 Tech Stack
Technology	Purpose
Angular 20.3.5	Frontend framework
TypeScript 5.x	Strongly typed language
SCSS	Styling & responsive design
ngx-translate	i18n / localization
Git + GitHub	Version control & CI/CD
VS Code / WebStorm	IDE

📅 Project Status
🔹 In active development

Core components implemented (Header, Hero, About, Skills, Projects, Contact, Legal Notice)

Language switch and responsive layout working

Final design polish & accessibility improvements in progress

🧾 License
© 2025 Friedrich Faraji – All rights reserved.
Unauthorized copying, modification, or commercial use is prohibited.
