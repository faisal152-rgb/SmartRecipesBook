import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AddRecipe from "./pages/AddRecipe";
import Collections from "./pages/Collections";
import About from "./pages/About";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/recipe/:id" component={RecipeDetail} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/add-recipe" component={AddRecipe} />
        <Route path="/collections" component={Collections} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
