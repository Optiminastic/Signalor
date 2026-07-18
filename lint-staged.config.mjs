// `--no-warn-ignored`: lint-staged passes explicit file paths, and ESLint warns
// when a listed file matches an `ignores` pattern (features/site/**, sanity/**,
// *.config.*). Combined with `--max-warnings 0` that warning fails the commit,
// so any commit touching those paths would be blocked. `eslint .` never hits
// this because it skips ignored files silently.
export default {
  '*.{ts,tsx}': ['eslint --fix --max-warnings 0 --no-warn-ignored', 'prettier --write'],
  '*.{js,mjs,cjs}': ['prettier --write'],
  '*.{json,md,yaml,yml}': ['prettier --write'],
  '*.css': ['prettier --write'],
}
