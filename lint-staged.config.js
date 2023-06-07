// lint-staged.config.js
module.exports = {
    "src/**/*.{js,ts,jsx,tsx}": ["eslint"],
    "src/**/*.{ts,tsx}": [() => "tsc --noEmit"],
};
