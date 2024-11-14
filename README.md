This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Examples

### 1. Only Server with Form Submission and formAction

* Form with server side interaction.
* formAction for toggle and delete.
* Only server actions, no client components.
* Pro work without javascript.
* Cons no user feedback.

### 2. Native Server only useFormStatus

### 2. Native Client Form with transition

* Form with client side rendering.


## Downsides

* revalidatePath wait for all actions to finish before revalidating. This is not good for slow actions or for when user do multiple actions in a row.

## Things to consider

* The formaction attribute specifies where to send the form-data when a form is submitted. This attribute overrides the form's action attribute. The formaction attribute is only used for inputs/buttons with type="submit".

## Libraries

https://www.npmjs.com/package/zod-form-data
https://github.com/react-hook-form/react-hook-form
https://github.com/TheEdoRan/next-safe-action
https://github.com/IdoPesok/zsa

## Reference

https://react.dev/reference/react/useActionState
https://react.dev/reference/react/useTransition
[Github nextjs-server-action-app](https://github.com/wpcodevo/nextjs-server-action-app/tree/main
)
https://github.com/vercel/next.js/tree/canary/examples/next-forms
https://github.com/aurorascharff/next15-remix-contacts-rebuild-v2/tree/main
https://github.com/leerob/next-saas-starter/tree/main
https://x.com/leeerob/status/1841888622959853763
https://github.com/leerob/next-saas-starter/blob/5770d6430cea57acd0abf9b26db6c340757adf8a/app/(dashboard)/dashboard/general/page.tsx#L24-L36
https://github.com/leerob/next-saas-starter/blob/5770d6430cea57acd0abf9b26db6c340757adf8a/lib/auth/middleware.ts#L31-L54
https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments