import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = 'Search links...'
}) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
            <span className="search-icon">🔍</span>
        </div>
    );
};

export default SearchBar;