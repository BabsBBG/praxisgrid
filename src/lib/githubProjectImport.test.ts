import { beforeEach, describe, expect, it } from "vitest";
import { canImportPublicRepo, parseGitHubRepoUrl, recordPublicRepoImport } from "./githubProjectImport";

const storage = new Map<string, string>();

describe("githubProjectImport", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        clear: () => storage.clear(),
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key)
      }
    });
    window.localStorage.clear();
  });

  it("accepts public GitHub repository URLs only", () => {
    expect(parseGitHubRepoUrl("https://github.com/BabsBBG/azure-quest")).toEqual({
      owner: "BabsBBG",
      repo: "azure-quest",
      url: "https://github.com/BabsBBG/azure-quest"
    });
    expect(parseGitHubRepoUrl("https://example.com/BabsBBG/azure-quest")).toBeNull();
  });

  it("tracks the local daily public import limit", () => {
    expect(canImportPublicRepo().allowed).toBe(true);
    for (let index = 0; index < 8; index += 1) recordPublicRepoImport();
    expect(canImportPublicRepo()).toMatchObject({ allowed: false, remaining: 0 });
  });
});
