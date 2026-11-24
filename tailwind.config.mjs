export default {
  content: ["./src/{pages,layouts,components}/**/*.astro", "./src/scripts/**/*.js"],
  theme: {
    extend: {
      colors: {
        "primary": "#a6fffc",
        "primary-dim": "#56e7ed",
        "on-surface-variant": "#b3bdcb",
        "surface-variant": "#262d39",
        "secondary-dim": "#efa4f0",
        "on-surface": "#eef2f8",
        "on-primary": "#102722",
        "surface-dim": "#14111e",
        "background": "#14111e",
        "secondary": "#efa4f0",
        "surface": "#14111e",
      },
      fontFamily: {
        "headline": ["Inter", "system-ui", "sans-serif"],
        "body": ["Inter", "system-ui", "sans-serif"],
        "label": ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: { "none": "0px", "DEFAULT": "12px", "lg": "12px", "xl": "16px", "full": "9999px" },
    },
  },
};
