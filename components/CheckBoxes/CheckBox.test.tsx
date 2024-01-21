import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { CheckBox } from "./CheckBox";

describe("CheckBox", () => {
  it("renders correctly", () => {
    const mockOnChange = jest.fn();
    render(<CheckBox prefectureName="Tokyo" onChange={mockOnChange} disabled={false} checked={false} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });

  it("handles checked state correctly", () => {
    const mockOnChange = jest.fn();
    render(<CheckBox prefectureName="Tokyo" onChange={mockOnChange} disabled={false} checked={true} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("handles disabled state correctly", () => {
    const mockOnChange = jest.fn();
    render(<CheckBox prefectureName="Tokyo" onChange={mockOnChange} disabled={true} checked={false} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const mockOnChange = jest.fn();
    render(<CheckBox prefectureName="Tokyo" onChange={mockOnChange} disabled={false} checked={false} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
