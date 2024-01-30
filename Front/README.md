# 🚀 Front Hook

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🛠️ Recommended Extensions

To make your development experience smoother, we recommend installing the following VS Code extensions:

- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar): A language support plugin for Vue.js 3.
- [Pretty Typescript](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin): Provides better TypeScript syntax highlighting.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): An opinionated code formatter that supports multiple languages.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): A tool for identifying and reporting on patterns in JavaScript.

You can install these extensions from the VS Code marketplace by clicking on the links.

## 🚀 Getting Started

> Disclaimer: This project is for educational purposes only. You will need some permissions to install it so contact me if you want the access

1. **Install the packages**

Get all the dependencies set up by running:

```bash
npm install
```

2. **Create a .npmrc file**

As we are using a personal component library you need to create a `.npmrc` file in your project root to specify the registry for packages scoped to `@lucaswerey`. The file should contain the following:

```bash
@lucaswerey:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN
```

Replace `YOUR_AUTH_TOKEN` with your personal GitHub access token. This token is used to authenticate and authorize your requests to the GitHub Package Registry. If you don't have a token yet, you can create one by following the instructions in [this guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

Please note that you should keep your GitHub access token secret. Do not commit the `.npmrc` file with your token to the repository.

3. **Run the project**

Once the packages are installed, you can start the project with the following command:

```bash
npm run dev
```

The project should now be running at <http://localhost:5173/> 🎉

## 📁 Directory Structure

Here's a high-level overview of our main directories:

```bash
.
├── 📦 node_modules/          # 🧩 Installed packages
├── 📄 package.json           # 📝 Lists the package dependencies
├── 🔒 package-lock.json      # 🌳 Describes the exact tree generated
├── 🌐 public/                # 📂 Public files
│   └── 📄 index.html         # 📝 HTML template
├── 📚 README.md              # 📖 The first page that the user will view when visiting the repository.
└── 📂 tests/                 # ✔ All the tests
└── 📂 src/                   # 📂 Source files
    ├── 📄 App.vue            # 📝 Main application component
    ├── 📄 main.ts            # 🚀 Main application entry point
    ├── 📂 assets/            # 🖼️ Static assets (images, fonts, etc.)
    ├── 📂 composable/        # 🧩 Composable functions for Vue Composition API
    ├── 📂 components/        # 🧩 Reusable components
    ├── 📂 data/              # 💾 All the const datas
    ├── 📂 router/            # 🗺️ Vue Router configuration
    ├── 📂 stores/            # 🏪 State management with Pinia
    ├── 📂 utils/             # 🛠️ Utility functions
    └── 📂 views/             # 🖼️ Vue components representing entire pages
```

⚠️ ALL THE PERSONNALITY SVG USED AND PERSONNALITY ANALYSIS ARE OWNED BY https://www.16personalities.com
