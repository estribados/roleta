module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        130: "30rem",
      },
      boxShadow: {
        "soft-shadow": "0px 10px 15px -3 rgba(0, 0, 0, 0.25);",
        header: "0 4px 15px -3px gold",
      },

      colors: {
        purple200: "#EFDBFE",
        black100: "#131212",
        gold100: "#E5BD31",
        black50: "#2b2b2b",
      },
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
};
