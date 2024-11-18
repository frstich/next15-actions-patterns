"use client"

import { startTransition, useActionState } from "react";
import { registerUserWithZodFormData, PrevStateType } from "../_actions";


export default function ComplextFormWithZodFormData() {

  const [state, formAction, isPending] = useActionState(registerUserWithZodFormData, {
    success: false,
    errors: {},
  } as PrevStateType)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // https://github.com/leerob/next-saas-starter/blob/5770d6430cea57acd0abf9b26db6c340757adf8a/app/(dashboard)/dashboard/general/page.tsx#L24-L36
    // If you call the Server Action directly, it will automatically
    // reset the form. We don't want that here, because we want to keep the
    // client-side values in the inputs. So instead, we use an event handler
    // which calls the action. You must wrap direct calls with startTranstion.
    // When you use the `action` prop it automatically handles that for you.
    // Another option here is to persist the values to local storage. I might
    // explore alternative options.
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  };

  return (
    <main className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form onSubmit={handleSubmit} aria-labelledby="form-title" autoComplete="off">
        <fieldset>
          <legend id="form-title" className="sr-only">User Registration Form</legend>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${!state.success && state.errors?.name ? "text-ping-600 border-pink-500" : ""}`}
              required
              aria-required="true"
              minLength={2}
              maxLength={55}
              autoFocus
            />
            {!state.success && state.errors?.name && (
              <p className="text-sm text-pink-600" id="name-error">
                {state.errors.name.join(", ")}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${!state.success && state.errors?.email ? "text-ping-600 border-pink-500" : ""}`}
              required
              aria-required="true"
            />
            {!state.success && state.errors?.email && (
              <p className="text-sm text-pink-600" id="email-error">
                {state.errors.email.join(", ")}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${!state.success && state.errors?.password ? "text-ping-600 border-pink-500" : ""}`}
              required
              aria-required="true"
              maxLength={55}
              minLength={8}
            />
            {!state.success && state.errors?.password && (
              <p className="text-sm text-pink-600" id="password-error">
                {state.errors.password.join(", ")}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${!state.success && state.errors?.confirmPassword ? "text-ping-600 border-pink-500" : ""}`}
              required
              aria-required="true"
              maxLength={55}
              minLength={8}
            />
            {!state.success && state.errors?.confirmPassword && (
              <p className="text-sm text-pink-600" id="confirmPassword-error">
                {state.errors.confirmPassword.join(", ")}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="terms" className="flex items-center" />
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="form-checkbox h-4 w-4 text-sky-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-black">
              I agree to the <a href="#" className="text-sky-600">terms and conditions</a>
            </span>
            {!state.success && state.errors?.terms && (
              <p className="text-sm text-pink-600" id="terms-error">
                {state.errors.terms.join(", ")}
              </p>
            )}
          </div>
        </fieldset>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Register"
          disabled={isPending}
        >
          Register
        </button>
      </form>
    </main>
  );
}
