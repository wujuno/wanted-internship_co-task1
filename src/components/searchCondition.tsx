import { Paper } from '@mui/material';
import { rSearchDataType } from '../types/searchData';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';

const Wrapper = styled(Paper)`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 5rem;
`;
const RecommendTitle = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  span {
    font-size: 13px;
    color: #999da1;
  }
`;
const RecommendDataWrapper = styled.div`
  overflow-y: auto;
  max-height: 300px;
`;
const ListBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(227, 226, 226, 0.3);
  }
`;
const NoneSeachTermBox = styled.div`
  height: 40px;
  padding: 8px 1rem;
`;

type searchConditionProps = {
  rSearchData: rSearchDataType[] | null;
  setValue: (value: string) => void;
};

const searchCondition = ({ rSearchData, setValue }: searchConditionProps) => {
  //[FIXME]: 추후 Navigate로 이용할 함수입니다.
  const handleSelectSearchTerm = (name: string) => {
    setValue(name);
    document.querySelector('form')?.submit();
  };
  return (
    <Wrapper>
      <RecommendTitle>
        <span>추천 검색어</span>
      </RecommendTitle>
      {rSearchData ? (
        <RecommendDataWrapper>
          <ul>
            {rSearchData.map(list => (
              <ListBox key={list.id} onClick={() => handleSelectSearchTerm(list.name)}>
                <SearchIcon sx={{ ml: '1em' }} fontSize="small" />
                <span>{list.name}</span>
              </ListBox>
            ))}
          </ul>
        </RecommendDataWrapper>
      ) : (
        <NoneSeachTermBox>
          <span>검색어 없음</span>
        </NoneSeachTermBox>
      )}
    </Wrapper>
  );
};

export default searchCondition;
