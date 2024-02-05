# Hook 🎣

> Welcome to Hook! This isn't just any project, it's the culmination of our learning journey. It's the result of countless hours of coding, debugging, and coffee. We're excited to share it with you. Dive in and explore our end-of-studies project! 🚀👩‍💻👨‍💻

![Vue](https://img.shields.io/badge/-Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Rust](https://img.shields.io/badge/-Rust-black?style=for-the-badge&logo=rust)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 🎯 Why Hook Exists

Ever felt like finding the right internship or alternance position is like searching for a four-leaf clover? That's exactly why we built Hook.

We're here to shake things up in the world of recruitment. No more endless scrolling, no more mismatched opportunities. Just you, your preferences, and a list of opportunities that feel like they've been handpicked just for you.

How do we do it? One word: Machine Learning. Hook learns from you, understands what you're looking for, and does all the heavy lifting.

The result? A process that's as smooth as a well-oiled machine, saving you time and energy.

So, whether you're a student ready to take on the world, or a recruiter on the hunt for fresh talent, Hook's got your back.

## Cloning the Project

To clone this project to your local machine, follow these steps:

1. Open your terminal.
2. Navigate to the directory where you want to clone the project.
3. Run the following command:

```bash
git clone https://github.com/LucasWerey/Hook
```

4. This will create a new directory named after the repository. Navigate into it by running

```bash
cd Hook
```

5. Now you have the project on your local machine and you can start working on it.

## Project Structure 🏗️

This repository contains both the frontend and the backend of the Hook project.

### Frontend 🎨

The frontend is built with Vue.js, a progressive JavaScript framework for building user interfaces. We've also used a personal component library, [DSLIB-PFE](https://github.com/LucasWerey/DSLIB-PFE), to ensure a consistent and high-quality user experience.

You can find the frontend code in the [frontend directory](https://github.com/LucasWerey/Hook/tree/main/Front).

### Backend ⚙️
The backend is primarily written in Rust, a language that offers high performance and safety. It handles all the business logic and database interactions. However, our AI model is implemented in Python, a language known for its strong support for scientific computing and machine learning.

You can find the backend code in the [backend directory](https://github.com/LucasWerey/Hook/tree/main/Api).

This way, you can work on the frontend and backend separately, but they're both part of the same project and repository. This makes it easier to coordinate changes and keep everything in sync.

## 📝 TODO

As our project continues to evolve, there are several enhancements and features we're planning to implement:

1. ~~Setup the front end and the back end~~
2. ~~Setup MongoDb with all collections~~
3. ~~Implement API paths for all collections~~
4. ~~Landing Page~~
5. ~~Make the sign in and sign up~~

## 📝 Commit Guidelines

We adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

A commit message consists of a **header**, **body** and **footer**. The header has a special format that includes a **type**, a **scope** and a **description**:

### Type

Must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages.)

### Description

The description is a short description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
