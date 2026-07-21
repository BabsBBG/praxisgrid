import { describe, expect, it } from "vitest";
import { isCertActivatable, metaFor } from "./certPaths";

describe("cert path lifecycle", () => {
  it("keeps AZ-500 historical while preventing new activation", () => {
    const az500 = metaFor("AZ-500");

    expect(az500.status).toBe("RETIRING");
    expect(az500.retirementDate).toBe("2026-08-31");
    expect(az500.replacementCert).toBe("SC-500");
    expect(isCertActivatable("AZ-500")).toBe(false);
  });

  it("leaves active paths activatable", () => {
    expect(isCertActivatable("SC-300")).toBe(true);
    expect(isCertActivatable("SC-500")).toBe(true);
  });
});
