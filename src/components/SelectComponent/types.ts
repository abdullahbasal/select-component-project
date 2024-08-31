import { IconTypes } from "../../enums/IconTypes";
import { User } from "../../types/User";

export interface SelectComponentProps {
  label: string;
  iconType?: IconTypes;
  placeholder: string;
  placeholderIcon?: boolean;
  customRender?: (option: User) => React.ReactNode;
  onOptionSelect: (selected: User) => void;
  disabledOptions?: number[];
  filterable?: boolean;
  sortable?: boolean;
  multiple?: boolean;
  displayValue?: (option: User) => string;
  disabled?: boolean;
}
