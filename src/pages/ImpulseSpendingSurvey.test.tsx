import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { captureEvent } from "@/lib/analytics";
import ImpulseSpendingSurvey from "./ImpulseSpendingSurvey";

vi.mock("@/lib/analytics", () => ({ captureEvent: vi.fn() }));

const captureEventMock = vi.mocked(captureEvent);

describe("ImpulseSpendingSurvey", () => {
  beforeEach(() => {
    captureEventMock.mockClear();
    window.scrollTo = vi.fn();
  });

  it("starts the survey and records the entry event", async () => {
    render(
      <MemoryRouter>
        <ImpulseSpendingSurvey />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Find my pattern" }));

    expect(await screen.findByText("Question 1 of 6")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Think of your last unplanned purchase/ }),
    ).toBeInTheDocument();
    expect(captureEventMock).toHaveBeenCalledWith(
      "survey_started",
      expect.objectContaining({
        survey_id: "impulse_spending",
        survey_version: "impulse_spending_v1",
      }),
    );
  });
});
