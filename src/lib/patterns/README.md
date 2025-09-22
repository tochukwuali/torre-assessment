# Feature-Based Architecture with MVVM

I use Feature-Based + MVVM for clean separation of concerns and better maintainability.

## Structure

```
src/
├── app/                 # Pages
├── features/           # Feature modules
│   └── users/
│       ├── components/ # Views
│       ├── hooks/      # ViewModels
│       ├── services/   # API calls
│       └── types/      # Data models
└── lib/               # Shared code
```

## Layers

**Model**: TypeScript interfaces
```typescript
export interface User {
  id: string
  name: string
  email: string
}
```

**ViewModel**: Custom hooks with state and business logic
```typescript
export const useUserViewModel = () => {
  const [users, setUsers] = useState<User[]>([])
  const fetchUsers = async () => { /* ... */ }
  return { users, fetchUsers }
}
```

**View**: Components for rendering
```typescript
export const UserList = () => {
  const { users } = useUserViewModel()
  return <div>{users.map(user => <UserCard user={user} />)}</div>
}
```

**Service**: API calls
```typescript
export class UserService {
  async getUsers(): Promise<User[]> {
    const response = await fetch('/api/users')
    return response.json()
  }
}
```

## Benefits

- **Scalable**: Easy to add new features
- **Maintainable**: Clear separation of concerns
- **Testable**: ViewModels are pure functions
- **Type-safe**: Full TypeScript support

See `src/features/users/` for a complete example.
