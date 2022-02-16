module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "moduleDirectories": [
    '<rootDir>/node_modules'
  ],
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
  ],
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.ts"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    // "/node_modules/(?!antd|rc-.+?|@babel/runtime|@ant-design).+(js|jsx)$",
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.(css|less)$",
    "^.+\\.module\\.(css|sass|scss|less)$",
  ],
  "modulePaths": [],
  "moduleNameMapper": {
    '^.+\\.(css|less)$': 'identity-obj-proxy',
    "^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy",
    "^App$": "<rootDir>/src/App",
  },
  "moduleFileExtensions": [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}
