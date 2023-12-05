import type { Config } from 'tailwindcss'

module.exports = {
	darkMode: 'class',
	daisyui: {
		themes: [
			{
				garden: {
					primary: '#84cc16',
					secondary: '#4d7c0f',
					accent: '#ecfccb',
					neutral: '#191D24',
					'base-100': '#2A303C',
					info: '#115e59',
					success: '#36D399',
					warning: '#fb923c',
					error: '#991b1b',
				},
			},
		],
	},
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
} satisfies Config
