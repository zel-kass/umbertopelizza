import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
	...nextVitals,
	...nextTs,
	// Next only enables a handful of jsx-a11y rules; turn on the full recommended set.
	// The plugin itself is already registered by eslint-config-next.
	{ rules: jsxA11y.flatConfigs.recommended.rules },
	// shortcut: known violations in files rewritten by the refactor (gallery → server component,
	// ScrambleHover simplified). Delete this block once those land.
	{
		files: ["app/(site)/gallery/page.tsx", "app/components/ScrambleHover.tsx"],
		rules: {
			"react-hooks/set-state-in-effect": "warn",
			"react-hooks/immutability": "warn",
			"jsx-a11y/click-events-have-key-events": "warn",
			"jsx-a11y/no-static-element-interactions": "warn",
		},
	},
	prettier,
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "prismicio-types.d.ts"]),
]);
