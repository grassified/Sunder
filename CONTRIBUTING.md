# Contributing to Sunder

First off, thank you for considering contributing to Sunder! Sunder is built to be a fast, private, and extremely lightweight YouTube Music desktop client. 

To keep the app buttery smooth and bloat-free, we have a few strict guidelines for contributing. Please read these before submitting a Pull Request!

## 1. The Sunder Philosophy: Zero Bloat
Our goal is to be the anti-Electron. Every Megabyte counts.
* **Minimize Dependencies:** Before adding a new Rust crate or NPM package, ask if it can be done natively. (e.g., Do not add `reqwest` or a TLS stack if Tauri's native APIs can handle it).
* **Performance First:** No regex compilations inside loops, no "zombie" background processes, and no blocking the main thread.

## 2. The Golden Rule: Atomic Pull Requests
**We do not accept "Mega-PRs."** 
If you use AI tools to help write code, they often try to build 5 features at once. We cannot safely review or merge massive PRs.
* **One Feature = One PR:** A Pull Request should do exactly ONE thing. If you are adding Keyboard Shortcuts, do not include UI tweaks for the Lyrics page in the same PR.
* **No "Ghost Code":** Do not include config fields, structs, or variables for future features that are not fully implemented in the current PR.
* **Keep it Small:** If your PR touches more than 10 files or goes over 500 lines of code, please ask yourself if it can be split into two smaller PRs.

---

Thank you for helping make Sunder the best music player on desktop!