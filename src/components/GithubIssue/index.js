import {useEffect, useState} from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import authKey from '../../utils/config'
import {AiOutlineSearch, AiOutlineLoading} from 'react-icons/ai'
import DisplayIssue from '../DisplayIssue'

const GithubIssue = () => {
  const languageList = ["JavaScript", "C++", "C#", "Go", "Java", "PHP", "Phython", "Ruby", "Scala", "TypeScript"];
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [language, setLanguage] = useState(languageList[0]);

  useEffect(()=>{
    searchIssue();
  },[language, page])

  const searchIssue = async () => {
    setLoading(true);    

    const res = await fetch(`https://api.github.com/search/issues?q=${searchText}+language:${language}+is:issue&sort=created&per_page=30&page=${page}`, {
      headers: {
        'Authorization': authKey
      }
    });
    const fetchData = await res.json();
    setLoading(false);
    if (fetchData.total_count === 0){
      setError(true)
    } 
    else {
      setError(false)
      setData(fetchData);
    }   
  }

  const PageNumber = () => {
    if (data){
      let bank = []
      if (data.total_count / 30 < 10) {
        for (let i=1; i<=Math.round(data.total_count / 30) + 1; i++){
          bank.push(<input type="button" value={i} onClick={changePage} key={`${i}-page`}/>)  
        }
      }
      else {
        for (let i=1; i<11; i++) {
          bank.push(<input type="button" value={i} onClick={changePage} key={`${i}-page`}/>)
        }
      }
      return bank.map(value=>value);
    }
    else {
      return null
    }    
  }

  const submitPage = (e) => {
    e.preventDefault();
    searchIssue();
  }

  const changeSearchText = (e) => {
    setSearchText(e.target.value);    
  }
  const changeLanguage = (e) => {
    setPage(1);
    setLanguage(e.target.value)
  }
  const changePage = (e) => {
    setPage(e.target.value);
  }
  
  return (
    <Main>
      <Header>
        Github Issue Search
      </Header>
      <div>
        <SearchBar>
          <form onSubmit={(e)=>{submitPage(e)}}>
            <div>
              <AiOutlineSearch style={{padding: "10px"}} onClick={searchIssue}/>
              <input text="text" value={searchText} onChange={changeSearchText}/>
              <select value={language} onChange={changeLanguage}>
                {languageList.map((language)=>{
                  return (
                    <option value={language} key={`${language}-id`}>
                      {language}
                    </option>
                  )
                })}
              </select>
            </div>
          </form>
        </SearchBar>
        <div>
          {loading === true ? 
            <Rotate>
              <AiOutlineLoading />
            </Rotate> : 
            error === true ? 
              <h3>
                No issues found
              </h3> : 
            <div>
              <DisplayIssue issue={data}/>
              <Page>
                <PageNumber/>
              </Page>
            </div>}
        </div>
      </div>
    </Main>
  )
}

export default GithubIssue
const Main = styled.div`
  @media only screen and (max-width: 600px){
    width: 100%;
  }
`
const Header = styled.div`
  display: block;
  font-size: 45px;
  text-align: center;
  width: 100%;
  margin: auto;
  margin-top: 10px;
  padding-bottom: 25px;
  border-bottom: 3px solid white;
`
const SearchBar = styled.div`
  text-align: center;
  font-size: 25px;
  padding: 10px 0 10px 0;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  box-shadow: 0px 0px 0px 1px silver;
  div {
    display: flex;
    justify-content: space-evenly;    
  }
  input {
    font-size: 25px;
    width: 66%;
    padding-left: 10px;
    :focus{
      outline: 2px solid orange;
    }
  }
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: block;
  text-align: center;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 5.2rem;  
`;
const Page = styled.div`
  text-align: center;
  margin-top: 20px;
  input[type=button] {
    padding: 10px;
    border: none;
    margin-left: 1px;
  }
`