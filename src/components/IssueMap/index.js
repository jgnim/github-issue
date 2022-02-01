import styled from 'styled-components';
import {AiOutlineExclamationCircle, AiOutlineComment} from 'react-icons/ai'

const IssueMap = ({entry}) => {
  const {state, title, html_url, body, number, created_at, user, labels, comments, comments_url} = entry;
  
  return (
    <Entry>
      <div>
        {state === "open" ? 
          <AiOutlineExclamationCircle style={{color: "green"}} title="Open Issue"/> : 
          <AiOutlineExclamationCircle style={{color: "red"}} title="Closed Issue"/>} 
      </div>
      <Info>
        <div>
          <div>
            <a href={`${html_url}`}> {title} </a>
          </div>
          <div style={{marginLeft: "10px", padding: "4px 0 4px 0"}}>
            {labels?.map((value)=>{
              return (
                <Tags title={value.description} key={value.id} color={value.color}>
                  {value.name}
                </Tags>  
              )})}
          </div>
        </div>
        <div style={{fontSize: "0.7em", marginLeft: "5px"}}>
          {body}
        </div>
        <div style={{fontSize: "0.8em"}}>
          #{number} created at {created_at.substring(0,10)} by <a href={user.url}>{user.login} </a>
        </div>
      </Info>
      <div>        
        <a href={comments_url} style={{textDecoration: "none"}}>
          <AiOutlineComment/>
          {comments}
        </a>
      </div>
    </Entry>
  )
}

export default IssueMap;

const Entry = styled.div`
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  a {
    color: white;
  }
  a:visited {
    color: orange;
  }
`
const Info = styled.div`
  width: 80%;  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  margin-left: 10px;
  height: 100%;
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-flow: row nowrap;
  }
`
const Tags = styled.div`
  display: flex;  
  flex-direction: row;
  padding: 0 5px 0 5px;
  border-radius: 5px;
  margin-left: 2px;
  font-size: 0.7em;
  background-color: #${props=>props.color};
  text-align: center;
  color: black;
  :hover{
    cursor: context-menu;
  }
`