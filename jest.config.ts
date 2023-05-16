import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  roots: [
    "<rootDir>/src"
  ],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    }
  },
};

export default config;
