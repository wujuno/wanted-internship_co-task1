import styled from '@emotion/styled';
import { Box, Container, IconButton, Input, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import SearchIcon from '@mui/icons-material/Search';
import { rSearchDataType } from './types/searchData';
import { handleData } from './utils/searchData';

const HeadTitle = styled.div`
  padding: 0 4rem;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  position: relative;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px 5px 30px;
    border: 2px solid #8aa9f9;
    border-radius: 99px;
  }
`;

const SearchConditionBox = styled(Paper)`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 5rem;
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [rSearchData, setRSearchData] = useState<rSearchDataType[] | null>(null);
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    setValue(term);
    handleData(term, setRSearchData);
  };
  //[FIXME]: 추후 Navigate로 이용할 함수입니다.
  const handleSelectSearchTerm = (name: string) => {
    setValue(name);
    document.querySelector('form')?.submit();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <HeadTitle>
        <Typography variant="h4" align="center" lineHeight="50px">
          국내 모든 임상 시험 검색하고 온라인으로 참여하기
        </Typography>
      </HeadTitle>
      <FormWrapper>
        <form onSubmit={() => alert('검색기능이 구현되지 않았습니다.')}>
          <Input
            disableUnderline={true}
            sx={{ width: '370px' }}
            placeholder="질환명을 입력해 주세요."
            autoFocus
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => {
              setTimeout(() => setIsOpen(false), 200);
            }}
          />
          {value ? (
            <IconButton onClick={() => setValue('')}>
              <CancelIcon fontSize="small" />
            </IconButton>
          ) : (
            <div style={{ width: '34.7px' }} />
          )}
          <IconButton type="submit">
            <ManageSearchRoundedIcon sx={{ fontSize: '40px' }} color="primary" />
          </IconButton>
        </form>
        {isOpen && (
          <SearchConditionBox>
            <Box sx={{ mt: '1em', ml: '1em' }}>
              <Typography variant="caption" color="#999DA1">
                추천 검색어
              </Typography>
            </Box>
            {/* [FIXME] 값이 없거나 '' 일때로 수정 */}
            {rSearchData ? (
              <Box sx={{ overflowY: 'auto', maxHeight: '300px' }}>
                <ul>
                  {rSearchData.map(list => (
                    <ListBox key={list.id} onClick={() => handleSelectSearchTerm(list.name)}>
                      <SearchIcon sx={{ ml: '1em' }} fontSize="small" />
                      <span>{list.name}</span>
                    </ListBox>
                  ))}
                </ul>
              </Box>
            ) : (
              <NoneSeachTermBox>
                <span>검색어 없음</span>
              </NoneSeachTermBox>
            )}
          </SearchConditionBox>
        )}
      </FormWrapper>
    </Container>
  );
}

export default App;
