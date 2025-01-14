// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: ["class"],
//     content: [],
//   theme: {
//   	extend: {
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		},
//   		colors: {}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// }

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"], // Enable dark mode based on a class
    content: [
        "./index.html",           // Main HTML file
        "./src/**/*.{js,ts,jsx,tsx}", // All JS/TS/JSX/TSX files in the src folder
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
				customColor: '#1c4045',
			}, // Add custom colors here if needed
        },
    },
    plugins: [require("tailwindcss-animate")], // Include the Tailwind CSS animate plugin
};
