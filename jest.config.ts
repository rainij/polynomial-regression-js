import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  roots: [
    "<rootDir>/src"
  ],
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // },
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  }
};

export default config;
