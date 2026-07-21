import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DEMO_BANK_COPY, PLATFORM_DISCLAIMER, QuestionBankNotice } from "./QuestionBankNotice";

describe("QuestionBankNotice", () => {
  it("renders demo bank warning and Microsoft disclaimer", () => {
    render(<QuestionBankNotice />);

    expect(screen.getByText(DEMO_BANK_COPY)).toBeInTheDocument();
    expect(screen.getByText(PLATFORM_DISCLAIMER)).toBeInTheDocument();
  });
});
