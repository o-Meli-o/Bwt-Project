import React, { useState } from 'react'
import './BwtPage.css'

const BwtDecodingPage = () => {
  const [inputString, setInputString] = useState("");
  const [original, setOriginal] = useState("");
  const [emptyTable, setEmptyTable] = useState([]);
  const [finalTable, setFinalTable] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  function handleInputChange(event) {
    setInputString(event.target.value);
  }
  
  function handleShowInfo(){
    setShowInfo(!showInfo);
  }

  function bwtDecode(bwtString) {
    const n = bwtString.length;
    let table = Array.from({ length: n }, () => '');
    let emptable = Array.from({ length: n }, () => '');
    setEmptyTable(emptable);
    
    // Iteratively sort and build the table
    for (let i = 0; i < n; i++) {
        // Prepend BWT string to each row
        for (let j = 0; j < n; j++) {
            table[j] = bwtString[j] + table[j];
        }
        // Sort rows lexicographically
        table.sort();
    }
    setFinalTable(table);
    // Find the original string by locating the row that ends with '$'
    let result = "";
    for (const row of table) {
        if (row.endsWith('$')) {
            result = result + row.slice(); // Remove the end-of-string character 0, -1
        }
    }

    // Set the result
    setOriginal(result);
  }

  return (
    <div className='bwt-page-container'>
      <h1>The Burrows-Wheeler Transformation Decoder</h1>
      <div>
        <input type="text" placeholder='Enter the text...' value={inputString} onChange={handleInputChange} />
        <button className='transform-button' onClick={() => bwtDecode(inputString)}>Decode!</button>
      </div>
      <h3>Here is the BWT decoding result:</h3>
      <div>
        <h4 className='bwt-result'>{original}</h4>
        <button className='info-button' onClick={handleShowInfo}><i class="fa-solid fa-lightbulb fa-2xl"></i></button>
      </div>
      {showInfo && (
      <p>The decoding process reconstructs the original string from the transformed string.
        <ol>
          <li>
            <h4>Initialize the Table:</h4>
            <ul>
              <li>First we create an empty table with as many rows as the length of the string.</li>
              <li>For {inputString}, we get the table: {`[${emptyTable.toString()}]`}</li>
            </ul>
          </li>
          <li>
            <h4>Iteratively Sort:</h4>
            <ul>
              <li>We insert the BWT string as a new column to the table.</li>
              <li>Sort the rows lexicographically.</li>
              <li>And repeat until the table is complete.</li>
              <li>When the table is complete, we get: {`[${finalTable.toString()}]`}</li>
            </ul>
          </li>
          <li>
            <h4>Identify Original String:</h4>
            <ul>
              <li>We find the row ending with the special end-of-string character ($). We read off the characters row-wise to get the original string.</li>
              <li>As the original we get: {original}</li>
            </ul>
          </li>
        </ol>
      </p>
      )}
    </div>
  )
}

export default BwtDecodingPage
