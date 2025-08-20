import React, { useState, useRef, useEffect } from "react";
import { CaretDown } from "phosphor-react";
import "./Register.css";

const CustomDropdown = ({ label, options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUp(spaceBelow < 150 && spaceAbove > spaceBelow);
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="form-group select-group" ref={dropdownRef}>
      <label>{label}</label>
      <div
        className={`custom-select ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <span className="selected-value">
          {value?.name || `Select ${label ? label.toLowerCase() : "option"}`}
        </span>
        <CaretDown size={14} weight="bold" className="select-icon" />
      </div>

      {isOpen && (
        <ul className={`dropdown-list ${openUp ? "open-up" : "open-down"}`}>
          {options.map((opt, idx) => (
            <li
              key={opt.id || idx}
              onClick={() => handleSelect(opt)}
              className="dropdown-option"
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
