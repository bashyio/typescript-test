import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import mockFetch from "../../../__mocks__/mockFetch";
import AutoComplete from "../index";

beforeEach(() =>
  jest.spyOn(window, "fetch").mockImplementation(mockFetch as any),
);

afterEach(() => {
  jest.restoreAllMocks();
});

describe("AutoComplete", () => {
  it("renders the AutoComplete Component", () => {
    render(<AutoComplete />);

    expect(
      screen.getByPlaceholderText(/search posts here.../i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "x" })).toBeInTheDocument();
  });

  it("allows the user to type into input", () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    userEvent.type(inputElement, "lab");

    expect(inputElement.value).toBe("lab");
  });

  it("clears typed input when the user clicks on 'x' button", () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    const buttonElement = screen.getByRole("button", { name: "x" });

    userEvent.type(inputElement, "lab");
    userEvent.click(buttonElement);

    expect(inputElement.value).toBe("");
  });

  it("allows the user to type in again after clearing", () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    const buttonElement = screen.getByRole("button", { name: "x" });

    userEvent.type(inputElement, "lab");
    userEvent.click(buttonElement);
    expect(inputElement.value).toBe("");

    userEvent.type(inputElement, "lab");
    expect(inputElement.value).toBe("lab");
  });

  it("displays matching results when the user types in.", async () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    userEvent.type(inputElement, "dol");

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
    const { getAllByRole } = within(list);
    const items = getAllByRole("button");
    expect(items.length).toBe(8);
  });

  it("clears matching results when the user clicks on 'x' button.", async () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    userEvent.type(inputElement, "dol");

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: "x" });

    userEvent.click(buttonElement);

    await act(async () => {
      const removedList = screen.queryByRole("list");
      expect(removedList).not.toBeInTheDocument();
    });
  });

  it("displays matching results again after clearing from button.", async () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    userEvent.type(inputElement, "dol");

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: "x" });

    userEvent.click(buttonElement);

    await act(async () => {
      const removedList = screen.queryByRole("list");
      expect(removedList).not.toBeInTheDocument();
    });

    userEvent.type(inputElement, "dol");
    expect(await screen.findByRole("list")).toBeInTheDocument();
  });

  it("clears matching results when the user clicks an entry.", async () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    userEvent.type(inputElement, "dol");

    const listItems = await screen.findAllByRole("button", { name: /dol/i });
    userEvent.click(listItems[0]);

    await act(async () => {
      const removedItems = screen.queryAllByRole("button", {
        name: /dol/i,
      });
      expect(removedItems.length).toBe(0);
    });
  });

  it("displays matching results again after selecting entry and typing.", async () => {
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);
    userEvent.type(inputElement, "dol");

    const listItems = await screen.findAllByRole("button", { name: /dol/i });
    userEvent.click(listItems[0]);

    await act(async () => {
      const removedItems = screen.queryAllByRole("button", {
        name: /dol/i,
      });
      expect(removedItems.length).toBe(0);
    });

    userEvent.type(inputElement, "o");
    expect(listItems.length).toBe(8);
    expect(inputElement.value).toBe("dolo");
  });

  it("displays no results when there are no matches.", async () => {
    jest.useFakeTimers();
    render(<AutoComplete />);

    const inputElement =
      screen.getByPlaceholderText<HTMLInputElement>(/search posts here.../i);

    userEvent.type(inputElement, "asd");

    const listItems = screen.queryAllByRole("button", { name: /asd/i });
    expect(listItems.length).toBe(0);
  });
});
