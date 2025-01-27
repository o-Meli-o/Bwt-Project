import React, { useState } from 'react'
import './BwtPage.css'

const HuffmanCodingPage = () => {

  const [inputText, setInputText] = useState('');
  const [encodedOutput, setEncodedOutput] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [freqTable, setFreqTable] = useState([]);
  const [huffmanTree, setHuffmanTree] = useState(null);
  const [codes, setCodes] = useState([]);
  const [originalSize, setOriginalSize] = useState();
  const [encodedSize, setEncodedSize] = useState();



  const handleEncode = () => {
    const output = encode(inputText);
    setEncodedOutput(output);
    const originalSize = new Blob([inputText]).size; // Size in bytes
    setOriginalSize(originalSize);
    const encodedSize = new Blob([output.replace(/ /g,'')]).size; // Size in bits
    setEncodedSize(encodedSize);
  };
  function handleShowInfo() {
    setShowInfo(!showInfo);
  }

  class Node {
    constructor(char, freq) {
      this.char = char;
      this.freq = freq;
      this.left = null;
      this.right = null;
    }
  }

  class MinHeap {
    constructor() {
      this.nodes = [];
    }

    insert(node) {
      this.nodes.push(node);
      this.bubbleUp();
    }

    bubbleUp() {
      let index = this.nodes.length - 1;
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.nodes[index].freq >= this.nodes[parentIndex].freq) break;
        [this.nodes[index], this.nodes[parentIndex]] = [this.nodes[parentIndex], this.nodes[index]];
        index = parentIndex;
      }
    }

    extractMin() {
      const minNode = this.nodes[0];
      const end = this.nodes.pop();
      if (this.nodes.length > 0) {
        this.nodes[0] = end;
        this.sinkDown();
      }
      return minNode;
    }

    sinkDown() {
      let index = 0;
      const length = this.nodes.length;
      const element = this.nodes[0];

      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;

        if (leftChildIndex < length) {
          leftChild = this.nodes[leftChildIndex];
          if (leftChild.freq < element.freq) {
            swap = leftChildIndex;
          }
        }

        if (rightChildIndex < length) {
          rightChild = this.nodes[rightChildIndex];
          if (
            (swap === null && rightChild.freq < element.freq) ||
            (swap !== null && rightChild.freq < leftChild.freq)
          ) {
            swap = rightChildIndex;
          }
        }

        if (swap === null) break;
        this.nodes[index] = this.nodes[swap];
        this.nodes[swap] = element;
        index = swap;
      }
    }

    isEmpty() {
      return this.nodes.length === 0;
    }
  }

  function buildFrequencyTable(text) {
    const frequency = {};
    for (const char of text) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
    setFreqTable(frequency);
    return frequency;
  }

  function buildHuffmanTree(frequency) {
    const minHeap = new MinHeap();

    for (const char in frequency) {
      minHeap.insert(new Node(char, frequency[char]));
    }

    while (minHeap.nodes.length > 1) {
      const left = minHeap.extractMin();
      const right = minHeap.extractMin();
      const merged = new Node(null, left.freq + right.freq);
      merged.left = left;
      merged.right = right;
      minHeap.insert(merged);
    }

    return minHeap.extractMin();
  }

  function generateCodes(node, prefix = '', codes = {}) {
    if (!node) return;

    if (node.char !== null) {
      codes[node.char] = prefix;
    }

    generateCodes(node.left, prefix + '0', codes);
    generateCodes(node.right, prefix + '1', codes);
    
    setCodes(codes);
    return codes;
  }

  function encode(text) {
    const frequency = buildFrequencyTable(text);
    const huffmanTreeRoot = buildHuffmanTree(frequency);
    setHuffmanTree(huffmanTreeRoot) //Set the tree
    const huffmanCodes = generateCodes(huffmanTreeRoot);

    return text.split('').map(char => huffmanCodes[char]).join(' ');
  }

  //Recursive function to render the tree
  const renderTree = (node) => {
    if (!node) return null;

    return (
      <ul>
        <li>
            <span>{node.char ? `${node.char} (${node.freq})` : `(${node.freq})`}</span>
            {node.left || node.right ? (
              <ul>
                  {renderTree(node.left)}
                {renderTree(node.right)}
              </ul>
            ): null}
        </li>
      </ul>
    );
  }

  return (
    <div className='bwt-page-container'>
      <h1>The Huffman Coding Encoder</h1>
      <div>
        <input type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to encode..." />
        <button className='transform-button' onClick={handleEncode}>Encode!</button>
      </div>
      <h3>Here is the encoded output:</h3>
      <div>
        <h4 className='bwt-result'>{encodedOutput}</h4>
        <button className='info-button' onClick={handleShowInfo}><i class="fa-solid fa-lightbulb fa-2xl"></i></button>
      </div>
      {showInfo && (
        <p>Huffman Coding is an entropy-based compression algorithm that assigns variable-length codes to characters based on their frequencies. More frequent characters get shorter codes.
          <ol>
            <li>
              <h4>Build Frequency Table:</h4>
              <ul>
                <li>We first need to count the frequency of each character in the input string.</li>
                <li>For {inputText}, we get the frequency table: {Object.keys(freqTable).length > 0 ? (
                  <ul>{Object.entries(freqTable).map(([char, freq]) => (
                    <li key={char}>{char}: {freq}</li>
                  ))}
                  </ul>
                ) :
                  (
                    <p>No Frequency data to show yet</p>
                  )
                }</li>
              </ul>
            </li>
            <li>
              <h4>Build Huffman Tree:</h4>
              <ul>
                <li>We construct a binary tree where each leaf node represents a character, and the path from root to leaf determines its code.</li>
                <li>After constructing the binary tree, we get: {renderTree(huffmanTree)} </li>
              </ul>
            </li>
            <li>
              <h4>Generate Codes:</h4>
              <ul>
                <li>Then we assign binary codes to characters based on the tree structure.</li>
                <li>For the sorted permutations, the last column characters are: {Object.keys(codes).length > 0 ? (
                  <ul>{Object.entries(codes).map(([char, code]) => (
                    <li key={char}>{char}: {code}</li>
                  ))}
                  </ul>
                ) :
                  (
                    <p>No data to show yet</p>
                  )
                }</li>
              </ul>
            </li>
            <li>
              <h4>Encode the String:</h4>
              <ul>
                <li>Replace each character in the input with its corresponding code.</li>
                <li>As the encoded output, we get: {encodedOutput}  
                  <ul>
                    <li>Original size: {originalSize} characters / {originalSize*8} bits</li>
                    <li>Encoded size: {encodedSize} bits</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>
        </p>
      )}
    </div>

  )
}

export default HuffmanCodingPage
