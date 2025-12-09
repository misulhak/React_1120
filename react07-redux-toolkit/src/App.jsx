import './App.css'
import TopNavi from './component/TopNavi'
import {Routes, Route} from "react-router-dom"
import ReduxBasicApp from './exam1/ReduxBasicApp'
import {Provider as BasicProvider} from 'react-redux'
import {store as basicStore } from './exam1/store';
function App() {

  return (
    <>
      <TopNavi></TopNavi>
      <Routes>
        <Route path='/' element={
          <BasicProvider store={basicStore}>
          <ReduxBasicApp /></BasicProvider>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
