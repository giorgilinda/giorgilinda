import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Frame } from "./Frame";

describe("Frame", () => {
  const user = userEvent.setup();

  test("renders", async () => {
    render(<Frame title="Frame 1" />);
    const element = await screen.findByTestId("frame");
    expect(element).toBeInTheDocument();
  });

  test("it contains all basic elements", async () => {
    render(<Frame title="Frame 1" />);
    const title = await screen.findByTestId("frameTitle");
    expect(title).toBeInTheDocument();

    const username = await screen.findByTestId("frameUsername");
    expect(username).toBeInTheDocument();

    const button = await screen.findByTestId("frameButton");
    expect(button).toBeInTheDocument();
  });

  test("click on submit, get a list of users", async () => {
    render(<Frame title="Frame 1" />);
    const username = await screen.findByTestId("frameUsername");
    const button = await screen.findByTestId("frameButton");

    await act(async () => {
      await user.type(username, "aaa");
      await user.click(button);
    });

    const element = await screen.findByTestId("frameResultText");
    expect(element).toBeInTheDocument();
  });
});
