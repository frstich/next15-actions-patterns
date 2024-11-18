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
  - Native validation has a default invalid value applying the invalid state without any user interaction.

### 2. Server Form with `useFormStatus`

- **Description**: Demonstrates how to handle form submission statuses on the client.
- **Features**:
  - Utilizes the `useFormStatus` hook to provide real-time feedback.
  - Maintains server-side rendering benefits while enhancing UX.
  - Can disable update and delete buttons at the same time during form submission.

### 3. Client Server Actions With `useActionState`

- **Features**:
  - Uses `useActionState` to manage form state on the client.
  - Provides real-time feedback for form submission.
  - Provides results for successful and failed form submissions.
- **downsides**:
  - Can't disable update and delete buttons at the same time during form submission. Sensible for multiple actions.

### 4. Client Server Actions with useTransition

- **Features**:
  - Uses `useTransition` to manage form state on the client.
  - Provides real-time feedback for form submission.
  - Provides results for successful and failed form submissions.

### 5. Client Server Actions with useOptimistic

- **Description**: Demonstrates how to use optimistic updates with Server Actions.
- **Features**:
  - Uses `useOptimistic` to update the UI optimistically.
  - Provides real-time feedback for form submission.
- **Downsides**:
  - Documentation is not clear about this implementation. In Add action the view has a blank salt.

### 6. Only Server Complex form validation with zod

- **Description**: Demonstrates how to use zod for complex form validation.
- **Features**:
  - Uses zod to validate form data.
- **Downsides**:
  - Native validation has a default invalid value applying the invalid state without any user interaction.
  - Users not have a feedback message about the invalid fields.
  - Errors handled in the server side are passed to page in search params with all the prev data because the form is reseted.

### 7. Client Server Actions with useActionState and zod-form-data

- **Downsides**:
  - Very complex types for useActionState with zod fieldErrors.
  - Form submission resets the form with the invalid fields. Need e.preventDefault() and startTransition to avoid this.
  - Zod server validation can't handle invalid styles in the client side, need to style manually.


## Downsides

While exploring Server Actions, some limitations were identified:

- **`revalidatePath` Waits for All Actions**:
  - `revalidatePath` waits for all actions to finish before revalidating.
  - **Issue**: Not ideal for slow actions or when users perform multiple actions rapidly.

- **Complex Reusability with `revalidatePath`**:
  - Reusing `revalidatePath` across different pages requires passing the path as an argument.
  - **Challenge**: Increases complexity when working with multiple paths.
  - **Ideas**: Consider using a high order function for revalidatePath. 

- **`revalidatePath`invalidate others paths than specificies**:
  - Behaviur of `revalidatePath` is not consistent, calling it in a action in a page with a different path will work. 
  - Form Docs: Currently, revalidatePath invalidates all the routes in the client-side Router Cache. This behavior is temporary and will be updated in the future to apply only to the specific path. [revalidatePath Reference](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
  - Need to know how Nextjs Cache works! [Cache Guide](https://nextjs.org/docs/app/building-your-application/caching)

- **Inconsistent Arguments with `useActionState`**:
  - Default server form actions expect `(data: FormData)`.
  - `useActionState` expects `(prevState: CustomFormState, data: FormData)`.
  - **Conclusion**: Default server actions aren't always compatible with `useActionState`, hindering reutilization.

## Ideas

- **Unified Action Library**:
  - Develop a library that standardizes Actions for compatibility with both `useActionState` and default server actions.
  - **Goal**: Simplify action definitions and enhance code reusability.
- **Zod types for useActionState**:
  - Create a library that generates Zod types from `useActionState` arguments.
  - **Benefits**: Enhance type safety and reduce manual type definitions.


## Things to Consider

- **Understanding the `formaction` Attribute**:
  - Specifies where to send form data upon submission, overriding the form's `action` attribute.
  - Applicable only to inputs/buttons with `type="submit"`.
  - **Implication**: Enables more granular control over form submission endpoints.

- **Not found uses cases for `prevState` argument in useActionState and Client use Server Actions**:
  - `useActionState` expects `(prevState: CustomFormState, data: FormData)`.
  - **Question**: How to use `prevState` in a form submission context?

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
https://x.com/leeerob/status/1841888622959853763
- https://www.rvf-js.io/
