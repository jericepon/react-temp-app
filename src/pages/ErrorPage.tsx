import { NavLink, useRouteError } from "react-router";

const ErrorPage = () => {
  const error: any = useRouteError();
  const message = error?.data ? error.data : "An error occurred";

  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold font-display tracking-tighter sm:text-5xl">
            {error?.data ? <span>Oops! No pizza here.</span> : message}
          </h1>
          {error?.data && <p className="text-gray-500">Wrong turn! Let's get you back on track.</p>}
          {error?.data && <p className="text-gray-500">{message}</p>}
        </div>
        <NavLink
          to="/"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-8"
        >
          Come back home, pizza lover!
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
