import React from 'react'
import BottomNavigation from './src/navigation/BottomNavigation'
import GlobalContext from './src/tools/GlobalContext'

const contextValue = {
  user: "Mayer Franklin",
  index: 0
}

const App = () => (
    <GlobalContext.Provider value={contextValue}>
      <BottomNavigation />
    </GlobalContext.Provider>
  )


export default App