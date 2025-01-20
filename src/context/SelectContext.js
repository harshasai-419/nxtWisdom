import React from 'react'

const SelectContext = React.createContext({
  isDark:false,
  toggleTheme: () => {},
})

export default SelectContext
