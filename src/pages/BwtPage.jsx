import React, { useState } from 'react'
import './BwtPage.css'

const BwtPage = () => {

    const [inputString, setInputString] = useState("");
    const [bwt, setBwt] = useState("");
    const [tableUnsorted, setTableUnsorted] = useState([]);
    const [tableSorted, setTableSorted] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    function handleInputChange(event){
        setInputString(event.target.value);
    }

    function handleShowInfo(){
        setShowInfo(!showInfo);
    }

    function bwtTransformation(input){
        const n = input.length;
        const table = [];

        // Generate table of cyclic permutations 
        for (let i = 0; i < n; i++) { 
            table.push(input.slice(i) + input.slice(0, i)); 
            
            setTableUnsorted(table.slice());
        }

        // Sort permutations lexicographically
        table.sort();

        setTableSorted(table.slice());

        // Extract the last column
        let result = "";
        for(let i = 0; i < n ; i++) {
            result = result + table[i][n-1];
        }

        // Set the result
        setBwt(result);

        setResultArray(result.split(""));
    }

  return (
    <div className='bwt-page-container'>
      <h1>The Burrows-Wheeler Transformation</h1>
      <div>
      <input type="text" 
             placeholder='Enter the text...'
             value={inputString}
             onChange={handleInputChange}/>
             <button className='transform-button' onClick={() => bwtTransformation(inputString)}>Transform!</button>
      </div>
      <h3>Here is the BWT result:</h3>
      <div>
      <h4 className='bwt-result'>{bwt}</h4>
      <button className='info-button' onClick={handleShowInfo}><i class="fa-solid fa-lightbulb fa-2xl"></i></button>
      </div>
      {showInfo && (
      <p>The bwtTransform function takes an input string,
         generates all cyclic permutations, sorts them,
          and then extracts the last column to produce the
           Burrows-Wheeler transformation of the input string.
           <ol>
                <li>
                    <h4>Generate table of cyclic permutations:</h4>
                    <ul>
                        <li>We first need to create all possible
                             cyclic permutations of the input string.</li>
                        <li>The for loop iterates through each 
                            position in the string, creating a new 
                            string by slicing the original string at
                             that position and concatenating the two parts.</li>
                        <li>For <span className='bwt-info'>{inputString}</span>, we get the permutations: <span className='bwt-info'>{`[${tableUnsorted.toString()}]`}</span></li>
                    </ul>
                </li>
                <li>
                    <h4>Sort permutations lexicographically:</h4>
                    <ul>
                        <li>We sort these permutations in lexicographic (alphabetical) order.</li>
                        <li>After sorting the permutations, we get: {`[${tableSorted.toString()}]`}</li>
                    </ul>
                </li>
                <li>
                    <h4>Extract the last column:</h4>
                    <ul>
                        <li>We create a new string by taking the last character from each permutation in the sorted table.</li>
                        <li>For the sorted permutations, the last column characters are: {`[${resultArray}]`}</li>
                        <li>Concatenating these characters, we get the BWT: {bwt}</li>
                    </ul>
                </li>
           </ol>
           </p>
      )}
    </div>
  )
}

export default BwtPage
