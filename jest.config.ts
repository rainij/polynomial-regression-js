import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  roots: [
    "<rootDir>/src"
  ],
  preset: "ts-jest",
  transform: {
    ".*\.ts": [
      "ts-jest", {tsconfig: "tsconfig.test.json"},
    ],
  },
};

export default config;
