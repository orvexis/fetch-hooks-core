import { describe, it, expect } from "vitest";
import { useRetry } from "../src/useRetry";
describe("useRetry", () => {
    it("retries before succeeding", async () => {
        let counter = 0;
        const fn = async () => {
            counter++;
            if (counter < 3)
                throw new Error("fail");
            return "success";
        };
        const { run } = useRetry(fn, { retries: 5 });
        const result = await run();
        expect(result).toBe("success");
    });
});
