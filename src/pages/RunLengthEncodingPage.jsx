import React, {useState} from 'react'
import './BwtPage.css'

const RunLengthEncodingPage = () => {

      const [inputString, setInputString] = useState("");
      const [rle, setRle] = useState("");
      const [resultArray, setResultArray] = useState([]);
      const [showInfo, setShowInfo] = useState(false);
  
      function handleInputChange(event){
          setInputString(event.target.value);
      }
  
      function handleShowInfo(){
          setShowInfo(!showInfo);
      }
  
      function runLengthEncoding(input){
        let result = "";
        let count = 1;
        
        for (let i = 1; i <= input.length; i++) {
           
          if (input[i] === input[i - 1]) {
            count++; 
          } 
            
          else {
            result += input[i - 1] + count;
              count = 1; 
          } 
        } 
        
        // Set the result
        setRle(result);

        setResultArray(result.split(""));
      }
  
    return (
      <div className='bwt-page-container'>
        <h1>Run-Length Encoding</h1>
        <div>
        <input type="text" 
               placeholder='Enter the text...'
               value={inputString}
               onChange={handleInputChange}/>
               <button className='transform-button' onClick={() => runLengthEncoding(inputString)}>Encode!</button>
        </div>
        <h3>Here is the RLE result:</h3>
        <div>
        <h4 className='bwt-result'>{rle}</h4>
        <button className='info-button' onClick={handleShowInfo}><i class="fa-solid fa-lightbulb fa-2xl"></i></button>
        </div>
        {showInfo && (
        <p>Run-Length Encoding (RLE) is a straightforward data
           compression technique that represents consecutive 
           identical values as a single value followed by 
           the count of repetitions. It's most effective on data
            with many repeated elements.
             <ol>
                  <li>
                      <h4>Iterate through the input data:</h4>
                      <ul>
                          <li>Compare each character with the previous character.</li>
                          <li>If they are the same, increment the count.</li>
                          <li>If they are different, append the previous character and 
                            the count to the result, then reset the count to 1.</li>
                          <li>For <span className='bwt-info'>{inputString}</span>, the RLE result is: <span className='bwt-info'>{rle}</span></li>
                      </ul>
                  </li>
             </ol>
             </p>
        )}
      </div>
    )
}

export default RunLengthEncodingPage
