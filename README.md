# 📌 Setting Up and Running TypeScript in VS Code Using Code Runner

## 🛠 1. Install VS Code Extensions

1. Open **VS Code**.
2. Go to **Extensions** (`Ctrl + Shift + X`).
3. Search for **"Code Runner"** and install it.

---

## 🌍 2. Install Node.js and TypeScript

1. Make sure **Node.js** is installed:
   ```sh
   node -v
   ```
   If not installed, [download and install Node.js](https://nodejs.org/).

2. Install **TypeScript** globally:
   ```sh
   npm install -g typescript
   ```
   Verify the installation:
   ```sh
   tsc -v
   ```

---

## 📂 3. Initialize a TypeScript Project

1. Open a terminal in **VS Code** (`Ctrl + ~`).
2. Navigate to your project folder:
   ```sh
   cd path/to/your/project
   ```
3. Initialize a TypeScript project:
   ```sh
   tsc --init
   ```
   This creates a `tsconfig.json` file.

---

## ⚙️ 4. Configure `tsconfig.json`

Open `tsconfig.json` and update these settings:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

**This ensures:**
- ✅ TypeScript compiles to **ES6**.
- ✅ Uses **CommonJS** (for better compatibility).
- ✅ Compiles files from `src/` to `dist/`.

---

## 📦 5. Install `ts-node` and Dependencies

In your project directory, install `ts-node` and `@types/node`:

```sh
npm install --save-dev ts-node @types/node
```

---

## ✍️ 6. Write Your TypeScript Code

1. Inside your project, create a `src/` folder.
2. Inside `src/`, create `index.ts`:
   ```ts
   console.log("Hello, TypeScript!");
   ```

---

## 🛠 7. Configure Code Runner for TypeScript

1. Open **VS Code Settings** (`Ctrl + ,`).
2. Search for **"Code Runner: Executor Map"**.
3. Click **Edit in settings.json**.
4. Add this inside `"code-runner.executorMap"`:
   ```json
   "typescript": "ts-node"
   ```
   **This tells Code Runner to execute TypeScript files using `ts-node`.**

---

## 🚀 8. Run Your TypeScript Code

1. Open `index.ts` in VS Code.
2. Click the **Run Code** button (`▶️`) in the top right.
3. Or press **`Ctrl + Alt + N`**.

---

## 🔨 9. Compile and Run TypeScript Manually (Optional)

If you want to compile manually:
```sh
tsc
```
This generates JavaScript files in the `dist/` folder.

Run the compiled file:
```sh
node dist/index.js
```

---

## 🛠 10. Fix Common Issues

- ❌ If Code Runner doesn't work, restart VS Code.
- ❌ If running `tsc` creates errors, check `tsconfig.json`.
- ❌ If `"ts-node"` is not recognized, install it globally:
  ```sh
  npm install -g ts-node
  ```

Now you can easily write and run TypeScript in VS Code using Code Runner! 🚀

# Setting Up Jest for TypeScript in a Node.js Project

## 🛠 Step 1: Install Jest and Dependencies
Instead of `yarn add -D jest ts-jest @types/jest`, use:

```sh
npm install --save-dev jest ts-jest @types/jest
```

- `--save-dev` (`-D` in Yarn) installs these as development dependencies.

## 🛠 Step 2: Initialize Jest
Instead of `npx jest --init` (or `npm jest --init`), use:

```sh
npx jest --init   
```

## Fixing Jest Compatibility Issues
It looks like your Jest setup isn't properly recognizing TypeScript files. This is likely due to missing `ts-jest` configuration or using an incompatible Jest version. Let's fix it step by step.

### ✅ Step 1: Downgrade Jest to v27
Since you're following a resource that suggests using Jest v27 due to compatibility issues, downgrade Jest to version 27:

```sh
npm install --save-dev jest@27 ts-jest@27 @types/jest
```

This ensures you're using a version that works well with `ts-jest`.

### 🛠 Step 2: Reinitialize Jest
Run the Jest initialization command again to regenerate the config:

```sh
npx jest --init
```

Make sure you select:
- **Test Environment:** `node`
- **Use TypeScript:** `Yes`
- **Coverage Provider:** `v8`

### 📝 Step 3: Update Jest Configuration
Open `jest.config.ts` (or `jest.config.js`) and make sure it includes the correct preset and transformation rules.

Modify it to:

```ts
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest", // Ensures TypeScript files are compiled
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
```

This makes sure Jest properly transforms TypeScript files.

