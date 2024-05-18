const path = require("path")

//   Or use in your packaage.json
//   "lint-staged": {
//     "./src/**/*.{ts,tsx}": [
//         "prettier --write",
//         "eslint --max-warnings 0 ."
//       ]
//     },

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.join(" ")}`

module.exports = {
  //   "**/*.(ts|tsx|js|jsx)": (filenames) => [
  //     "npm eslint " + filenames.join(" "),
  //     "npm prettier --write " + filenames.join(" "),
  //   ],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
}
