# 🤝 Contributing to ScaleX-Commerce

Thank you for contributing.

This project is designed for learning real-world full-stack development with a strong focus on scalable architecture. Please keep contributions clear, focused, and safe.

## 🎯 Project Focus

This repository primarily emphasizes backend architecture, scalability, testing, and system design.
Frontend contributions are also welcome, especially for bug fixes, usability improvements, and performance optimization.

## 👥 Who Can Contribute

Everyone is welcome, including beginners.

For large changes (new modules, major refactors, or architecture-level updates), please open a discussion first and align with maintainers before implementation.

## ✅ Good First Contributions

- Fix typos or improve documentation
- Add or improve tests
- Fix small bugs with clear reproduction steps
- Refactor small functions for readability
- Improve frontend bugs and performance
- Propose new features in Discussions before implementation

## 🚀 Quick Contribution Flow

1. Fork and clone the repository.
2. Create a branch with a clear name.
3. Read the relevant documentation before coding:
   - Frontend: `Front-end/README.md`
   - Backend: `Backend/readme.md`
4. Make one focused change.
5. Run tests.
6. Open a pull request with a clear description.

## 🌿 Branch Naming

Use readable branch names:

- `feature/short-description`
- `fix/short-description`
- `docs/short-description`
- `refactor/short-description`

Example:

```bash
git checkout -b fix/cart-total-rounding
```

## ⚙️ Setup

Follow setup instructions from the root README based on your workflow:

- Local development (fully local)
- Docker development (fully dockerized)
- Hybrid development (local + docker)

## 🧠 Coding Guidelines

- Keep changes small and focused.
- Follow the existing folder structure and naming style.
- Avoid unnecessary dependencies.
- Prefer readable, maintainable code.

Backend guidance:

- Keep business logic in services, not controllers.
- Validate input data.
- Add tests for important logic.

Frontend guidance:

- Build reusable components.
- Keep state management simple and maintainable.
- Avoid unnecessary re-renders.

## 🧪 Tests

Run tests before opening a pull request:

```bash
npm run test
```

If your change affects only one module, run the most relevant tests for that module when possible.

## 📝 Commit Message Style

Use short, clear commit messages:

- `feat: add product filter by category`
- `fix: handle empty cart checkout`
- `docs: update backend setup steps`

## 📦 Pull Request Checklist

Include the following in your PR:

- What changed
- Why it changed
- How to test the change
- Screenshots (if UI changed)

## 🐞 Reporting Issues

Please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Logs or screenshots (if available)

## 📌 Important Notes

- Do not mix unrelated changes in one PR.
- Do not submit major untested changes.
- Ask questions in Discussions or in your PR if anything is unclear.

Small contributions are valuable. Consistent improvements help this project grow for everyone.