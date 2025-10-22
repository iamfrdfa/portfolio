
---

## 🇩🇪 **README.de.md**

```markdown
# 🌐 Friedrich Faraji – Portfolio (Angular)

Ein modernes, responsives **Frontend-Portfolio** entwickelt mit **Angular 20**, **TypeScript** und **SCSS**.  
Es kombiniert technisches Know-how mit einem klaren, minimalistischen Design und Mehrsprachigkeit.

---

## 🚀 Projektübersicht

Dieses Portfolio präsentiert die Arbeit, Fähigkeiten und Persönlichkeit von **Friedrich Faraji** – einem Frontend-Entwickler mit Fokus auf moderne Webtechnologien und sauberes UI-Design.

Das Projekt entstand im Rahmen der **Developer Akademie**-Weiterbildung zum Full-Stack Web-Developer.

### 🧩 Haupt-Features

- 🌍 **Mehrsprachigkeit (DE / EN)** – umgesetzt mit `@ngx-translate/core`  
- 💅 **Eigenes SCSS-Designsystem** – Variablen, Mixins und responsive Breakpoints  
- 🧠 **Komponentenbasierte Architektur** (Angular 20.3.5)
- 📱 **Vollständig responsives Layout** mit `flexbox`, `grid` und `clamp()`
- 🧭 **Smooth-Scroll-Navigation** & animierte Hero-Buttons (Marquee-Effekt)
- 🔄 **Sprachumschalter** (DE ↔ EN)
- 📬 **Kontaktformular** mit Angular Reactive Forms
- ⚖️ **Rechtliche Seiten:** Impressum & Datenschutzerklärung
- 🚫 **NOINDEX-Setup**, um Google-Indexierung zu verhindern
- 🧱 **Saubere Git-Struktur** mit angepasster `.gitignore`

---

## 🗂️ Projektstruktur (Kurzüberblick)



## 🗂️ Projektstruktur (Kurzüberblick)

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

## 🧑‍💻 Entwicklung

### 1. Installation

```bash
npm install
Erforderlich: Node ≥ 20.x und Angular CLI ≥ 20.3.5

2. Lokaler Server
bash
Code kopieren
ng serve
Danach im Browser http://localhost:4200 öffnen.
Die Anwendung lädt automatisch neu, sobald du Dateien änderst.

3. Komponenten erstellen
bash
Code kopieren
ng generate component component-name
Beispiel:

bash
Code kopieren
ng generate component pages/aboutme
Alle verfügbaren Schematics:

bash
Code kopieren
ng generate --help
4. Build (Produktionsversion)
bash
Code kopieren
ng build
Erstellt ein optimiertes Build im Ordner dist/.

5. Unit-Tests
bash
Code kopieren
ng test
Führt Tests mit Karma aus.

🧭 Deployment
Das Projekt ist für GitHub Pages oder Vercel vorbereitet.
Für Testzwecke oder private Vorstellungen kann eine Subdomain mit NOINDEX-Meta-Tag genutzt werden, um Suchmaschinen auszuschließen.

🧠 Tech-Stack
Technologie	Zweck
Angular 20.3.5	Framework
TypeScript 5.x	Programmiersprache
SCSS	Styling & Responsive Design
ngx-translate	Mehrsprachigkeit
Git + GitHub	Versionsverwaltung & Deployment
VS Code / WebStorm	Entwicklungsumgebung

📅 Projektstatus
🔹 Aktiv in Entwicklung

Komponentenstruktur steht (Header, Hero, About Me, Skills, Projects, Contact, Legal Notice)

Sprachumschaltung & Responsive Design funktionieren

Design-Feinschliff und Accessibility in Arbeit

🧾 Lizenz
© 2025 Friedrich Faraji – Alle Rechte vorbehalten.
Eine Verwendung, Vervielfältigung oder Veränderung ohne Genehmigung ist nicht gestattet.
