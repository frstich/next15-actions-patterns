import { registerUserOnlyServerZod } from "../_actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ServerWithZod(props: { searchParams: SearchParams }) {

  const { errors, name } = await props.searchParams;
  return (
    <main className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form action={registerUserOnlyServerZod} aria-labelledby="form-title" autoComplete="off">
        <fieldset>
          <legend id="form-title" className="sr-only">User Registration Form</legend>
          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Errors:</strong>
              <p>{errors}</p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
              aria-required="true"
              minLength={2}
              maxLength={55}
              autoFocus
              defaultValue={name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
              aria-required="true"
              maxLength={55}
              minLength={8}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
              aria-required="true"
              maxLength={55}
              minLength={8}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="terms" className="flex items-center" />
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="form-checkbox h-4 w-4 text-sky-600 transition duration-150 ease-in-out"
              required
              aria-required="true"
            />
            <span className="ml-2 text-sm text-black">
              I agree to the <a href="#" className="text-sky-600">terms and conditions</a>
            </span>
          </div>
        </fieldset>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Register"
        >
          Register
        </button>
      </form>
    </main>
  );
}
