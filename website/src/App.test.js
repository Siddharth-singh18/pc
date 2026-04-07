import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

test("renders the existing home page shell", () => {
  window.scrollTo = jest.fn();
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});
