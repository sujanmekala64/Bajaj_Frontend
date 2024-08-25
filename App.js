import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        setError('');
        try {
            const parsedJson = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:3000/bfhl', parsedJson);
            setResponse(res.data);
        } catch (err) {
            setError('Invalid JSON format or server error.');
        }
    };

    const handleMultiSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const filteredResponse = () => {
        if (!response) return null;
        let filtered = {};
        if (selectedOptions.includes("Numbers")) filtered.numbers = response.numbers;
        if (selectedOptions.includes("Alphabets")) filtered.alphabets = response.alphabets;
        if (selectedOptions.includes("Highest Lowercase Alphabet")) filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return filtered;
    };

    return (
        <div>
            <h1>BFHL Challenge</h1>
            <textarea 
                placeholder="Enter JSON here"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {response && (
                <>
                    <select multiple onChange={handleMultiSelectChange}>
                        <option value="Numbers">Numbers</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </>
            )}
        </div>
    );
}

export default App;
