import type { Route } from "./+types/home";
import PortfolioComponent from "~/portfolio/portfolio";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Kumar Raja Portfolio App" },
    { name: "description", content: "Welcome to Kumar Raja Portfolio site!" },
  ];
}

export default function Home() {
  return <PortfolioComponent />;
}
