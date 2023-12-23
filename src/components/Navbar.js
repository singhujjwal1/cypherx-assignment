import React, { useState } from 'react';
import { HiOutlineAdjustments, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

const Navbar = ({ displayMode, setDisplayMode, darkTheme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDisplayModeChange = (newMode) => {
    setDisplayMode(newMode);
    setDropdownOpen(false);
  };

  const handleToggleTheme = () => {
    darkTheme = !darkTheme;
    console.log(darkTheme);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none cursor-pointer flex items-center relative"
          >
            <HiOutlineAdjustments className="inline-block mr-2" /> Display
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <button
                onClick={() => handleDisplayModeChange('group-by-status')}
                className={`block px-4 py-2 text-sm ${
                  displayMode === 'group-by-status' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Group by Status
              </button>
              <button
                onClick={() => handleDisplayModeChange('group-by-user')}
                className={`block px-4 py-2 text-sm ${
                  displayMode === 'group-by-user' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Group by User
              </button>
              <button
                onClick={() => handleDisplayModeChange('group-by-priority')}
                className={`block px-4 py-2 text-sm ${
                  displayMode === 'group-by-priority' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Group by Priority
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={handleToggleTheme}
            className="bg-yellow-500 text-white px-3 py-1 rounded focus:outline-none cursor-pointer"
          >
            {darkTheme ? <HiOutlineSun className="inline-block mr-2" /> : <HiOutlineMoon className="inline-block mr-2" />}
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
