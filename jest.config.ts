import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  roots: [
    "<rootDir>/src"
  ],
  preset: "ts-jest",
  moduleNameMapper: {
    // Jest does not like the file extension ".js"
    "(.+)\\.js": "$1"
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    }
  },
};

export default config;
