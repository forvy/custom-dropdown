import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '../assets/close-icon';
import CloseIconFilled from '../assets/close-icon-filled';
import DropdownArrowIcon from '../assets/dropdown-arrow';
import SearchIcon from '../assets/search-icon';

const Dropdown = ({ label, options, multiSelect, searchable, renderOption, zIndex, usePortal }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const portalRef = useRef(null);

  useEffect(() => {
    if (usePortal) {
      portalRef.current = document.createElement('div');
      document.body.appendChild(portalRef.current);
    }

    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, [usePortal]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOption(option);
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const handleRemoveChip = (option) => {
    setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
  };

  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => (
      <span
        key={index}
        className={part.toLowerCase() === highlight.toLowerCase() ? 'font-bold bg-green-400/80' : ''}
      >
        {part}
      </span>
    ));
  };

  const filteredOptions = typeof options[0] === 'string'
    ? options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
    : options.map(a => a.label).filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownContent = (
    <div className="absolute left-0 right-0 border mt-1 bg-white max-h-60 overflow-y-auto shadow-lg" style={{ zIndex }}>
      {searchable && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 pr-4 border-b"
          />
          {searchTerm.length > 1 && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearchTerm}>
              <CloseIconFilled className="h-5 w-5 text-white cursor-pointer" />
            </button>
          )}
        </div>
      )}
      <ul>
        {filteredOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`p-2 cursor-pointer hover:bg-green-200/50 ${multiSelect ? (selectedOptions.includes(option) ? 'bg-green-200/50' : '') : selectedOption === option ? 'bg-green-200/50' : ''}`}
          >
            {renderOption ? renderOption(option) : getHighlightedText(option, searchTerm)}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className='flex justify-between w-full'>
      <span className='flex items-center'>{label}</span>
      <div className="relative inline-block w-11/12" ref={dropdownRef}>
        <div className="border p-2 bg-white cursor-pointer flex items-center justify-between h-14" onClick={toggleDropdown}>
          {multiSelect && (
            <div className="flex flex-wrap">
              {selectedOptions.map((option) => (
                <div key={option} className="flex items-center bg-gray-200 p-1 m-1 rounded-full px-3 text-sm gap-2">
                  {option}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveChip(option);
                    }}
                  >
                    <CloseIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {!multiSelect && (
            <div className="flex flex-wrap">
              {selectedOption}
            </div>
          )}
          <span className={`transform ${isOpen ? 'rotate-180' : ''}`}>
            <DropdownArrowIcon className="h-5 w-5 text-gray-500" />
          </span>
        </div>
        {isOpen && (usePortal ? ReactDOM.createPortal(dropdownContent, portalRef.current) : dropdownContent)}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
    }))
  ]),
  multiSelect: PropTypes.bool,
  searchable: PropTypes.bool,
  renderOption: PropTypes.func,
  zIndex: PropTypes.number,
  usePortal: PropTypes.bool,
};

Dropdown.defaultProps = {
  label: 'Label',
  multiSelect: false,
  searchable: false,
  renderOption: null,
  zIndex: 9999,
  usePortal: false,
};

export default Dropdown;
