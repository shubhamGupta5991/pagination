import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Pagination = () => {
const [tData ,setTData] = useState([]);
const [currPage,setCurrPage] = useState(1);
const perPageRec = 10;
const lastIndex = currPage* perPageRec;
const firstIndex = lastIndex - perPageRec;
const records = tData.slice(firstIndex,lastIndex)
const numPage = Math.ceil(tData.length/perPageRec);
// const num = [...Array(numPage+1).keys()].slice(1)
// console.log(num);

async function tableData(){
    try {
        const response = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
    // console.log(response.data)
    setTData(response.data)
    } catch (e) {
        alert('failed to fetch data')
    }
}

function prevPage(){
    if(currPage !== 1){
        setCurrPage(currPage-1)
    }
    
}
function nextPage(){
    if(currPage !== numPage){
        setCurrPage(currPage+1)
    }

}


useEffect(()=>{
    tableData()
   
    
},[])
// console.log(tData);
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Employee Data Table</h1>
        <div>
            <table border={4} style={{width:'650px', height:'50vh',textAlign:'center',margin:'auto'}}>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </thead>
                <tbody>
                    {records.map((e)=>(
                         <tr key={e.id}>
                         <td>{e.id}</td>
                         <td>{e.name}</td>
                         <td>{e.email}</td>
                         <td>{e.role}</td>
                     </tr>

                    ))}
               
                </tbody>
                
            </table>
        </div>
        <div style={{margin:'16px',textAlign:'center'}}>
            <button onClick={prevPage}> Previous</button>
            <span style={{margin:'0 8px'}}>{currPage}</span>
            <button onClick={nextPage}>Next</button>
        </div>
       

    </div>
  )
}

export default Pagination