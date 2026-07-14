import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    expect(screen.getAllByRole("button", { name: /IAM \/ Entra ID/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Cloud Security Engineer/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /SOC Analyst/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Cloud SOC \/ Detection/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Azure Security/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /Detection Engineering/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /AI Security/i }).length).toBeGreaterThan(0);
  });

  it("supports typed answer, self-score, submit, and coach reveal", async () => {
    const user = userEvent.setup();
    renderJobReadiness();

    await user.click(screen.getByRole("button", { name: /Start 30-minute simulation/i }));
    fireEvent.change(screen.getByLabelText(/Your answer/i), {
      target: { value: "I would validate the alert, scope the affected identity, contain the risk, document evidence, and reference a project." }
    });
    await user.click(screen.getByRole("button", { name: /4/i }));
    await user.click(screen.getByRole("button", { name: /Submit answer/i }));

    expect(screen.getByText(/Say this/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next question/i })).toBeEnabled();
  });
});
