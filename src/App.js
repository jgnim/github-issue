import logo from './logo.svg';
import GithubIssue from './components/GithubIssue';
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: white;
    width: 90%;
    margin: auto;
    @media only screen and (max-width: 500px) {
      width: 100%;
    }
  }
`
function App() {  
  return (
    <div className="App">
      <GlobalStyle />
      <GithubIssue/>
    </div>
  );
}

export default App;

