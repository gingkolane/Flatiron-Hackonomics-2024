'use client'
import { useEffect, createContext, useReducer } from 'react'

const GlobalState = createContext(null)

const DispatchProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          toast: {
            message: 'Logged in.',
            type: 'success',
          },
        }
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: {},
          toast: {
            message: 'Logged out.',
            type: 'success',
          },
        }
      case 'REFRESH':
        return {
          ...state,
          user: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    user: {},
  })

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  )
}

export { GlobalState, DispatchProvider }
