# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7e4f4b53-264a-46f7-bccc-4a989f7b0ced

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7e4f4b53-264a-46f7-bccc-4a989f7b0ced) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Math/LaTeX rendering (KaTeX)

The calculators can render mathematical formulas using KaTeX. In a `FormulaSpec`, set `expressionLatex` to a LaTeX string and it will be displayed in the modal de fórmulas.

- Library: `katex` (CSS included via component)
- Where: `CalculatorModal` info modal, using the reusable `src/components/ui/Latex.tsx`

Example:

```ts
// src/lib/calculators/index.ts (excerpt)
{
	id: "ckd-epi",
	label: "CKD-EPI",
	expressionLatex: "eGFR=141\n\times\n\min(\frac{S_{Cr}}{\kappa}, 1)^\alpha\n\times\n\max(\frac{S_{Cr}}{\kappa}, 1)^{-1.209}\n\times\n0.993^{\text{age}}\n\times\n1.018^{[female]}\n\times\n1.159^{[black]}",
}
```

If `expressionLatex` isn't provided, the UI falls back to `expressionText` or `description`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7e4f4b53-264a-46f7-bccc-4a989f7b0ced) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
