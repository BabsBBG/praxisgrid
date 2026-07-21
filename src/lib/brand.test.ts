import { describe, expect, it } from "vitest";
import {
  ASSESSMENT_DISCLAIMER,
  DEMO_BANK_COPY,
  PRODUCT_DESCRIPTION,
  PRODUCT_INITIALS,
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
  PROVIDER_NEUTRAL_DISCLAIMER
} from "./brand";

describe("PraxisGrid brand constants", () => {
  it("uses the approved product name, tagline, and description", () => {
    expect(PRODUCT_NAME).toBe("PraxisGrid");
    expect(PRODUCT_INITIALS).toBe("PG");
    expect(PRODUCT_TAGLINE).toBe("Learn it. Practise it. Prove it.");
    expect(PRODUCT_DESCRIPTION).toContain("source-grounded technical capability platform");
  });

  it("keeps assessment disclaimers provider-neutral and seed-bank explicit", () => {
    expect(PROVIDER_NEUTRAL_DISCLAIMER).toContain("Microsoft, Amazon Web Services, Google Cloud");
    expect(ASSESSMENT_DISCLAIMER).toContain("not official certification-provider exam questions");
    expect(DEMO_BANK_COPY).toContain("seed content");
    expect(DEMO_BANK_COPY).toContain("not yet fully source-grounded or reviewed");
  });
});
