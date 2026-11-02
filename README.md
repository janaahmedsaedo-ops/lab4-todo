# Lab 4 - Todo App (TypeScript)

A todo list app built with **HTML**, **CSS** and **TypeScript** for the CSE343 Web Development course.

## Features

- Add a task with the **Add** button or the Enter key
- Mark a task as completed with its checkbox
- Double-click a task to edit it, then press Enter to save
- Delete a task with the trash button
- Filter tasks: **All**, **Active** or **Completed**
- "items left" counter
- **Clear completed** and **Clear all** buttons

## Files

| File | Description |
|---|---|
| `lab4.html` | The page structure (HTML) |
| `lab4.css` | The page styling (CSS) |
| `lab4.ts` | The app logic written in TypeScript (source code) |
| `lab4.js` | JavaScript generated from `lab4.ts` by the TypeScript compiler, loaded by the HTML file |
| `tsconfig.json` | TypeScript compiler settings |
| `package.json` | Project configuration (TypeScript as a dev dependency) |

## How to Run

1. Download or clone this repository.
2. Keep all the files in the same folder.
3. Open `lab4.html` in any web browser.

## How to Re-compile After Editing `lab4.ts`

1. Install Node.js.
2. In the project folder, run `npm install`.
3. Run `npx tsc` to regenerate `lab4.js`.

## TypeScript Concepts Used

- Classes (`Task`) and type annotations
- Arrays with `filter()`
- Arrow functions
- Template literals

## Technologies Used

- HTML5
- CSS3
- TypeScript (ES2020)

## Author

Jana Ahmed Saieed - ID: 24P0410
