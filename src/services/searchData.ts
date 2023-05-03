import axios from 'axios';
import { rSearchDataType } from '../types/searchData';
import { SHOWEDMAXNUM } from '../constants/constants';
import { setDataToLocalStorage } from '../utils/searchData';

export const getSearchDataAPI = (
  term: string,
  setRSearchData: (data: rSearchDataType[] | null) => void
) => {
  axios
    .get(`/api/v1/search-conditions/?name=${term}`)
    .then(res => {
      if (res.status === 200) {
        const storedData = localStorage.getItem(term);
        if (!storedData && res.data.length > 0) {
          setRSearchData(res.data.slice(0, SHOWEDMAXNUM));
          setDataToLocalStorage(term, res.data.slice(0, SHOWEDMAXNUM));
          console.info('calling api');
        }
      }
    })
    .catch(err => console.log(err));
};
