import { act, render, screen } from "@testing-library/react";
import { DropdownButton } from "./DropdownButton";
import userEvent from "@testing-library/user-event";

describe("DropdownButton", () => {
  const user = userEvent.setup();
  test("renders", async () => {
    render(<DropdownButton username="torvalds" />);
    const element = await screen.findByTestId("button");
    expect(element).toBeInTheDocument();
  });

  test("it contains all basic elements", async () => {
    render(<DropdownButton username="torvalds" />);
    const username = await screen.findByTestId("buttonUsername");
    expect(username).toBeInTheDocument();

    const arrowDown = await screen.findByTestId("buttonArrowDown");
    expect(arrowDown).toBeInTheDocument();
  });

  test("click on button, get a list of repositories", async () => {
    render(<DropdownButton username="torvalds" />);
    const button = await screen.findByTestId("button");

    await act(async () => {
      await user.click(button);
    });

    const arrowUp = await screen.findByTestId("buttonArrowUp");
    expect(arrowUp).toBeInTheDocument();

    const element = await screen.findByTestId("repositories");
    expect(element).toBeInTheDocument();
  });
});
