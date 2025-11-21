import { describe, it, expect, vi } from "vitest";
import { useFetch } from "../src/useFetch";
describe("useFetch", () => {
    it("fetches JSON", async () => {
        const mock = { hello: "world" };
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mock,
        });
        const state = useFetch("https://example.com");
        // Wait for async execution
        await new Promise((r) => setTimeout(r, 10));
        expect(state.data.value).toEqual(mock);
        expect(state.error.value).toBeNull();
        expect(state.loading.value).toBe(false);
    });
});
