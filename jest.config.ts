import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest",
  resolver: "jest-ts-webcompat-resolver",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
      useESM: true
    }
  }
};

export default config;
