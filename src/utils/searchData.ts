import { EXPIRATIONMINUTES } from '../constants/constants';
import { getSearchDataAPI } from '../services/searchData';
import { rSearchDataType } from '../types/searchData';

export const setDataToLocalStorage = (key: string, data: rSearchDataType[]) => {
  const expireAt = new Date().getTime() + EXPIRATIONMINUTES * 60 * 1000;
  const dataToStore = {
    data,
    expireAt
  };
  localStorage.setItem(key, JSON.stringify(dataToStore));
};

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
