# Next.js Server Actions Exploration

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introduction

This repository is dedicated to researching and experimenting with the new **React** and **Next.js Server Actions** functionality. The project includes a series of examples, ideas, considerations, and conclusions aimed at understanding how Server Actions work and how they can be effectively utilized in modern web applications.

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone [repository_url]
cd [project_name]
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Learn More

To deepen your understanding of Next.js and Server Actions, consider exploring the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – An interactive Next.js tutorial.
- [React `useActionState` Hook](https://react.dev/reference/react/useActionState) – Understand how to manage action states.
- [React `useTransition` Hook](https://react.dev/reference/react/useTransition) – Learn about transitions in React.

Visit the [Next.js GitHub repository](https://github.com/vercel/next.js) to contribute or provide feedback.

## Examples

### 1. Server-Only Form Submission with `formAction`

- **Description**: A form that interacts entirely on the server side using Server Actions.
- **Features**:
  - Uses `formAction` for toggle and delete operations.
  - No client components; works without JavaScript.
- **Pros**:
  - Enhances performance by reducing client-side overhead.
  - Improves accessibility for users without JavaScript.
- **Cons**:
  - Lacks user feedback for loading states, errors, or disabled inputs and buttons.

### 2. Native Server Form with `useFormStatus`

- **Description**: Demonstrates how to handle form submission statuses on the server.
- **Features**:
  - Utilizes the `useFormStatus` hook to provide real-time feedback.
  - Maintains server-side rendering benefits while enhancing UX.

### 3. Native Client Form with `useTransition`

- **Description**: A client-side rendered form using `useTransition`.
- **Features**:
  - Provides smooth UI transitions during form submissions.
  - Offers immediate feedback and improved interactivity.

## Downsides

While exploring Server Actions, some limitations were identified:

- **`revalidatePath` Waits for All Actions**:
  - `revalidatePath` waits for all actions to finish before revalidating.
  - **Issue**: Not ideal for slow actions or when users perform multiple actions rapidly.

- **Complex Reusability with `revalidatePath`**:
  - Reusing `revalidatePath` across different pages requires passing the path as an argument.
  - **Challenge**: Increases complexity when working with multiple paths.

- **Inconsistent Arguments with `useActionState`**:
  - Default server form actions expect `(data: FormData)`.
  - `useActionState` expects `(prevState: CustomFormState, data: FormData)`.
  - **Conclusion**: Default server actions aren't always compatible with `useActionState`, hindering reutilization.

## Ideas

- **Unified Action Library**:
  - Develop a library that standardizes Actions for compatibility with both `useActionState` and default server actions.
  - **Goal**: Simplify action definitions and enhance code reusability.

## Things to Consider

- **Understanding the `formaction` Attribute**:
  - Specifies where to send form data upon submission, overriding the form's `action` attribute.
  - Applicable only to inputs/buttons with `type="submit"`.
  - **Implication**: Enables more granular control over form submission endpoints.

## Libraries

- [zod-form-data](https://www.npmjs.com/package/zod-form-data) – Schema validation for form data using Zod.
- [React Hook Form](https://github.com/react-hook-form/react-hook-form) – Performant, flexible form library.
- [next-safe-action](https://github.com/TheEdoRan/next-safe-action) – Enhances safety and security for Next.js Server Actions.
- [ZSA (Zod Server Actions)](https://github.com/IdoPesok/zsa) – Integrates Zod validation with Server Actions.

## References

- [React `useActionState` Hook](https://react.dev/reference/react/useActionState)
- [React `useTransition` Hook](https://react.dev/reference/react/useTransition)
- [Next.js Server Action App Example](https://github.com/wpcodevo/nextjs-server-action-app/tree/main)
- [Next.js Forms Examples](https://github.com/vercel/next.js/tree/canary/examples/next-forms)
- [Remix Contacts Rebuild with Next.js 15](https://github.com/aurorascharff/next15-remix-contacts-rebuild-v2/tree/main)
- [Next.js SaaS Starter by Lee Robinson](https://github.com/leerob/next-saas-starter/tree/main)
  - [Dashboard General Page](https://github.com/leerob/next-saas-starter/blob/5770d6430cea57acd0abf9b26db6c340757adf8a/app/(dashboard)/dashboard/general/page.tsx#L24-L36)
  - [Auth Middleware](https://github.com/leerob/next-saas-starter/blob/5770d6430cea57acd0abf9b26db6c340757adf8a/lib/auth/middleware.ts#L31-L54)
- [Passing Additional Arguments in Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments)

