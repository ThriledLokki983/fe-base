# State Management Refactor

## Current Issues with useAppState

1. **Over-engineering**: Complex reducer pattern for simple state
2. **Performance**: Heavy re-renders due to complex dependencies
3. **Maintainability**: Hard to understand and modify
4. **Type Safety**: Runtime type checking instead of compile-time

## Proposed Solution: Simplified State with Zustand

Replace the complex useAppState with:
- Zustand for global state
- Separate stores for different concerns
- Better type safety
- Simpler APIs

## Implementation Plan

1. Install Zustand
2. Create separate stores for:
   - App state (route, title, loading)
   - Toast notifications
   - UI state (breakpoints, sidebar)
3. Remove complex reducer patterns
4. Implement proper memoization
