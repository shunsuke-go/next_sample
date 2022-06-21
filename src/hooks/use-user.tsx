import React, {
  useContext,
  useState,
  createContext,
  PropsWithChildren
} from 'react'
import { User } from '~/types/User'

type UserContextType = [
  User | undefined,
  React.Dispatch<React.SetStateAction<User | undefined>>
];
const UserContext = createContext<UserContextType>([undefined, () => {}])

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>()
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext<UserContextType>(UserContext)
