import React from 'react'
import BottomNavigation from './src/navigation/BottomNavigation'
import GlobalContext from './src/tools/GlobalContext'
import Data from './assets/data/data.json'

const contextValue = {
 
  user: ""
  
}

const App = () => (
   
    <GlobalContext.Provider value={contextValue}>
      <BottomNavigation />
    </GlobalContext.Provider>
  )


export default App