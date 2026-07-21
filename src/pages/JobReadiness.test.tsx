import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useAppStore } from "../store/useAppStore";
import { JobReadiness } from "./JobReadiness";

function renderJobReadiness(path = "/cert/az-500/job") {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/cert/:cert/job" element={<JobReadiness />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("JobReadiness", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useAppStore.setState({ interviewSessions: [] });
  });

  it("renders all required M2 tracks", () => {
    renderJobReadiness();

    expect(screen.getByText("IAM / Entra ID")).toBeInTheDocument();
    expect(screen.getByText("Cloud Security Engineer")).toBeInTheDocument();
    expect(screen.getByText("SOC Analyst")).toBeInTheDocument();
    expect(screen.getByText("Cloud SOC / Detection")).toBeInTheDocument();
    expect(screen.getAllByText("Azure Security").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Detection Engineering").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AI Security").length).toBeGreaterThan(0);
  });

  it("supports typed answer, self-score, submit, and coach reveal", () => {
    renderJobReadiness();

    fireEvent.click(screen.getByRole("button", { name: /Start 30-minute simulation/i }));
    fireEvent.change(screen.getByLabelText(/Your answer/i), {
      target: { value: "I would validate the alert, scope the affected identity, contain the risk, document evidence, and reference a project." }
    });
    fireEvent.click(screen.getByRole("button", { name: /4/i }));
    fireEvent.click(screen.getByRole("button", { name: /Submit answer/i }));

    expect(screen.getByText(/Say this/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next question/i })).toBeEnabled();
  });
});
