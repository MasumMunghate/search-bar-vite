import { useState, useEffect, useCallback } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFunction = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = await response.json();
      setSearchValue(data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (inputValue) {
        fetchFunction(inputValue);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const filteredValue = searchValue.filter((item) => 
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="w-full">
        <input
          placeholder="Search Something"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        {filteredValue?.map((item) => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
    </div>
  );
};

export default App;