import React, {Component} from 'react'
import './App.css'
import LeftMenu from './components/leftMenu/leftMenu'
import TopMenu from './components/topMenu/topMenu'
import MainContainer from './pages/mainContainer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopMenu />
                <LeftMenu />
                <MainContainer>{this.props.children}</MainContainer>
            </div>
        )
    }
}

export default App
