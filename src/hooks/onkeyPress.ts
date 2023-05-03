import { rSearchDataType } from '../types/searchData';

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLElement>,
  rSearchData: rSearchDataType[] | null,
  selectedIndex: number | null,
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>,
  setValue: (value: string) => void
) => {
  if (rSearchData !== null) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prevIndex: number | null) =>
          prevIndex === null ? rSearchData.length - 1 : Math.max(prevIndex - 1, 0)
        );
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prevIndex: number | null) =>
          prevIndex === null ? -1 : Math.min(prevIndex + 1, rSearchData.length - 1)
        );
        break;
      case 'Enter':
        if (selectedIndex !== null) {
          setValue(rSearchData[selectedIndex].name);
          document.querySelector('form')?.submit();
        }
        break;
      default:
        break;
    }
  }
};
