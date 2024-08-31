import React, { useState, useMemo, useRef, useEffect } from "react";
import { User } from "../../types/User";
import { SelectComponentProps } from "./types";
import { IconMapping } from "../../enums/IconMapping";
import useUsers from "../../hooks/useUsers";
import { checkIcon, chevronDownIcon } from "../../assets/images";
import { searchIcon, deleteIcon } from "../../assets/icons";

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  placeholder,
  customRender,
  onOptionSelect,
  disabledOptions = [],
  filterable = false,
  sortable = false,
  multiple = false,
  displayValue,
  iconType,
  placeholderIcon,
  disabled = false,
}) => {
  const { data: users, isLoading, error } = useUsers();
  const [selectedOptions, setSelectedOptions] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredAndSortedUsers = useMemo(() => {
    let result = users ? users.filter((user) => user !== undefined) : [];

    if (filterable && filter) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (sortable) {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [users, filter, filterable, sortable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFilter("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setFilter("");
    };
  }, []);

  const handleOptionClick = (user: User) => {
    if (disabled || disabledOptions.includes(user.id)) {
      return;
    }

    const isSelected = selectedOptions.some((option) => option.id === user.id);
    let newSelectedOptions;

    if (multiple) {
      newSelectedOptions = isSelected
        ? selectedOptions.filter((option) => option.id !== user.id)
        : [...selectedOptions, user];
    } else {
      newSelectedOptions = isSelected ? [] : [user];
      setIsOpen(false);
    }

    setSelectedOptions(newSelectedOptions);
    if (newSelectedOptions.length > 0) {
      onOptionSelect(newSelectedOptions[0]);
      if (filterable) {
        setFilter("");
      }
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleRemoveOption = (id: number) => {
    setSelectedOptions(selectedOptions.filter((option) => option.id !== id));
  };

  const getSelectedOptionsDisplay = () => {
    if (multiple) {
      return selectedOptions.length > 0 ? (
        <>
          {placeholderIcon && (
            <img src={searchIcon} width={15} height={15} alt="icon" />
          )}
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "2px 8px",
                margin: 2,
                fontSize: "14px",
                fontWeight: 600,
                opacity: disabled ? 0.5 : 1,
              }}
              className="selected-option-border"
            >
              {iconType && IconMapping[iconType] && (
                <img
                  src={IconMapping[iconType].src}
                  width={16}
                  height={16}
                  alt="icon"
                />
              )}
              <div style={{ flexGrow: 1 }}>{option.username}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(option.id);
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                }}
                disabled={disabled}
              >
                <img src={deleteIcon} width={8} height={8} alt="remove" />
              </button>
            </div>
          ))}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {placeholderIcon && (
            <img src={searchIcon} width={15} height={15} alt="icon" />
          )}
          {!filterable && placeholder}
        </div>
      );
    }

    return selectedOptions.length > 0 ? (
      <>
        {placeholderIcon && (
          <img src={searchIcon} width={15} height={15} alt="icon" />
        )}
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {iconType && IconMapping[iconType] && (
              <img
                src={IconMapping[iconType].src}
                width={IconMapping[iconType].width}
                height={IconMapping[iconType].height}
                alt="icon"
              />
            )}
            <div>
              {displayValue ? (
                displayValue(option)
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{option.name}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {"@" + option.username}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    ) : (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          opacity: disabled ? 0.5 : 1,
          fontWeight: 500,
          color: "#667085",
        }}
      >
        {placeholderIcon && (
          <img src={searchIcon} width={15} height={15} alt="icon" />
        )}
        {!filterable && placeholder}
      </div>
    );
  };

  return (
    <div
      className={`select-component ${disabled ? "disabled" : ""}`}
      ref={dropdownRef}
    >
      <label
        style={{
          fontSize: "14px",
          color: "#344054",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <div className="dropdown-container">
        <div
          className="dropdown-header"
          onClick={toggleDropdown}
          style={{
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 5,
              flexGrow: 1,
            }}
          >
            {getSelectedOptionsDisplay()}
            {filterable && (
              <input
                ref={inputRef}
                type="text"
                placeholder={selectedOptions.length <= 0 ? placeholder : ""}
                value={filter}
                onClick={(e) => {
                  setIsOpen(true);
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                className="search-input"
                style={{
                  border: "none",
                  outline: "none",
                  padding: "4px",
                  fontSize: "14px",
                  flexGrow: 1,
                  opacity: disabled ? 0.5 : 1,
                  width: "30px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                }}
              />
            )}
          </div>
          <div className={`dropdown-icon ${isOpen ? "open" : ""}`}>
            <img src={chevronDownIcon} width={20} height={20} alt="down_fill" />
          </div>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            <ul className="options-list">
              {filteredAndSortedUsers.length > 0 ? (
                filteredAndSortedUsers.map((user) => (
                  <li
                    key={user.id}
                    className={`option-item ${
                      selectedOptions.some(
                        (selected) => selected.id === user.id
                      )
                        ? "selected"
                        : ""
                    } ${disabledOptions.includes(user.id) ? "disabled" : ""}`}
                    onClick={() => handleOptionClick(user)}
                    style={{
                      cursor:
                        disabled || disabledOptions.includes(user.id)
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        disabled || disabledOptions.includes(user.id) ? 0.5 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {iconType && IconMapping[iconType] && (
                        <img
                          src={IconMapping[iconType].src}
                          width={IconMapping[iconType].width}
                          height={IconMapping[iconType].height}
                          alt="icon"
                        />
                      )}
                      {customRender ? (
                        customRender(user)
                      ) : (
                        <div>
                          {displayValue ? (
                            displayValue(user)
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 5,
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: "bold",

                                  gap: 5,
                                }}
                              >
                                {user.name}
                              </div>
                              <div>{"@" + user.username}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      {selectedOptions.some(
                        (selected) => selected.id === user.id
                      ) && (
                        <img
                          src={checkIcon}
                          width={20}
                          height={20}
                          alt="check"
                        />
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li
                  className="no-results"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectComponent;
