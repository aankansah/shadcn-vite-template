1. I usually make changes so always read the context of the app as it is currently before making changes. You have this problem of reintroducing code I've removed because you always seem to have old context and not my current code.
2. This project uses PNPM
3. Always check the projects packages installed to know what libraries to use for specific things.
4. For forms use react-hook-form with zod for validations
5. For api calls use axios with react-query by tanstack
6. For state management use zustand
7. For ui use shadcn
8. Always read the projects src/lib/utils.ts and src/lib/helpers.ts to understand what utility and helper functions is available that can be utilized before writing multiple duplicates of the same functions across the codebase.
9. To Preview app first run it on port http://localhost:5173/ before if it doesn't work
10.
