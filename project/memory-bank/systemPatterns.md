# System Patterns

## Architecture
- React-based Single Page Application (SPA)
- Component-driven development
- Atomic design principles
- State management with React hooks
- Real-time updates via Supabase
- Authentication with Supabase Auth

## Design Patterns
1. Component Patterns
   - Compound components
   - Render props
   - Custom hooks
   - Context providers
   - Protected routes
   - Error boundaries

2. State Management
   - Local state with useState
   - Complex state with useReducer
   - Global state with Context API
   - Auth state management
   - Real-time state sync

3. Data Patterns
   - Data fetching with async/await
   - Real-time subscriptions
   - Optimistic updates
   - Cache management
   - Session persistence
   - Error handling

4. UI Patterns
   - Responsive design
   - Mobile-first approach
   - Progressive enhancement
   - Accessibility patterns
   - Form validation
   - Loading states

5. Authentication Patterns
   - JWT token management
   - Session recovery
   - Protected routes
   - Auth state persistence
   - Auto-refresh tokens

6. Database Patterns
   - Row Level Security
   - Real-time subscriptions
   - Optimistic updates
   - Relational data modeling
   - Soft deletes

7. File Modification Patterns
   - Always provide complete file contents
   - Include all code, even if unchanged
   - No truncation or summarization
   - Update package.json first for dependencies
   - Maintain file integrity
   - Preserve existing code structure
   - Ensure code compatibility
   - Follow project conventions

8. Command Execution Patterns
   - Use type="start" for application commands
   - Use type="shell" for other commands
   - Auto-restart dev server after shell commands
   - Proper command sequencing
   - Error handling in commands
   - Dependency installation handling
   - Environment setup