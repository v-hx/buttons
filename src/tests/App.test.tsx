import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Buttons demo/i);
  expect(linkElement).toBeInTheDocument();
});
