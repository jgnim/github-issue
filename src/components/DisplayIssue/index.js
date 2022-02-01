import styled from 'styled-components'
import IssueMap from '../IssueMap';

const DisplayIssue = ({issue}) => {
  if (issue) {
    const {total_count, items} = issue;
    return (
      <Wrapper>
        <div style={{padding: "5px", marginLeft: "10px"}}>
          Total issue: {total_count}
        </div>
        <div>
          {items.map((value)=>{
            return <IssueMap key={value.id} entry={value}/>
          })}
        </div>
      </Wrapper>
    )
  }
  else{
    return null
  }
}

export default DisplayIssue

const Wrapper = styled.div`
  overflow-wrap: break-word;
  width: 100%;
  border: 1px solid grey;
  margin: auto;
  margin-top: 15px;
`
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
  
`
const Tags = styled.div`
  display: flex;  
  flex-direction: row;
  padding: 0 5px 0 5px;
  border-radius: 5px;
  margin-left: 2px;
  font-size: 0.7em;
  background-color: #${props=>props.color};
  overflow: nowrap;
  :hover{
    cursor: context-menu;
  }
`