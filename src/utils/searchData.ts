import { EXPIRATIONMINUTES } from '../constants/constants';
import { getSearchDataAPI } from '../services/searchData';
import { rSearchDataType } from '../types/searchData';

export const handleData = (
  term: string,
  setRSearchData: (data: rSearchDataType[] | null) => void
) => {
  const storedData = localStorage.getItem(term);
  if (storedData) {
    const { data } = JSON.parse(storedData);
    setRSearchData(data);
  } else {
    getSearchDataAPI(term, setRSearchData);
  }
};

export const setDataToLocalStorage = (key: string, data: rSearchDataType[]) => {
  const expireAt = new Date().getTime() + EXPIRATIONMINUTES * 60 * 1000;
  const dataToStore = {
    data,
    expireAt
  };
  localStorage.setItem(key, JSON.stringify(dataToStore));
};

export const checkLocalStorageExpiration = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) as string;
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const { expireAt } = JSON.parse(storedData);
      if (expireAt && Date.now() >= expireAt) {
        localStorage.removeItem(key);
      }
    }
  }
};
