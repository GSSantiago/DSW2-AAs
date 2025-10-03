import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Login route (no layout)
  route("login", "routes/login.tsx"),
  
  // Main layout for authenticated routes
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("family", "routes/family.tsx"),
  ]),
  
  // Catch-all route for DevTools and other requests
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
