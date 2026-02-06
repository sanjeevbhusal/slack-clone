import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	isAuthenticatedNextjs,
	nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isAuthRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
const isProtectedRoute = createRouteMatcher(["/(.*)"]);

export default convexAuthNextjsMiddleware((request) => {
	if (isAuthRoute(request) && isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, "/");
	}

	if (
		isProtectedRoute(request) &&
		!isAuthenticatedNextjs() &&
		!isAuthRoute(request)
	) {
		return nextjsMiddlewareRedirect(request, "/sign-in");
	}
});

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
