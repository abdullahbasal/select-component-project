import React from "react";
import "./App.css";
import { IconTypes } from "./enums/IconTypes";
import SelectComponent from "./components/SelectComponent/SelectComponent";
import { User } from "./types/User";

const App: React.FC = () => {
  const handleOptionSelect = (selected: User) => {
    console.log("Selected option:", selected);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <SelectComponent
          label="Team member"
          placeholder="Select team member"
          onOptionSelect={handleOptionSelect}
        />
        <SelectComponent
          label="Team member"
          iconType={IconTypes.UserIcon}
          placeholder="Select team member"
          onOptionSelect={handleOptionSelect}
          disabledOptions={[1, 2]}
          customRender={(option) => (
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <div style={{ fontWeight: "bold" }}>{option.name}</div>
              <div>{"@" + option.username}</div>
            </div>
          )}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <SelectComponent
          label="Team member"
          iconType={IconTypes.UserImage}
          placeholder="Select team member"
          onOptionSelect={handleOptionSelect}
          disabledOptions={[1, 2]}
        />
        <SelectComponent
          label="Team member"
          iconType={IconTypes.GreenCircle}
          placeholder="Select team member"
          onOptionSelect={handleOptionSelect}
          disabledOptions={[1, 2]}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <SelectComponent
          label="Team member"
          placeholder="Select team member1"
          placeholderIcon={true}
          onOptionSelect={handleOptionSelect}
          disabledOptions={[1, 2]}
        />
        <SelectComponent
          label="Team member"
          placeholder="Select team member1"
          placeholderIcon={true}
          iconType={IconTypes.UserImage}
          onOptionSelect={handleOptionSelect}
          disabledOptions={[1, 2]}
          multiple={true}
          filterable={true}
        />
      </div>
    </div>
  );
};

export default App;
