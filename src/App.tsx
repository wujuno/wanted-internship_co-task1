import styled from '@emotion/styled';
import { Box, Container, IconButton, Input, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchIcon from '@mui/icons-material/Search';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: 2px solid #8aa9f9;
  border-radius: 99px;
`;

const SearchConditionBox = styled(Paper)`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 4.5rem;
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

type rSearchDataType = {
  name: string;
  id: number;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [rSearchData, setRSearchData] = useState<rSearchDataType[] | null>(null);
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    getSearchData(e.currentTarget.value);
  };

  const getSearchData = (term: string) => {
    axios
      .get(`/api/v1/search-conditions/?name=${term}`)
      .then(res => {
        //[FIXME]숫자 상수화 하기
        if (res.status === 200) return setRSearchData(res.data.slice(0, 7));
      })
      .catch(err => console.log(err));
  };
  const handleSelectSearchTerm = (name: string) => {
    setValue(name);
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
      <Box sx={{ p: '0 4em', mb: '2em' }}>
        <Typography variant="h4" align="center" lineHeight="50px">
          국내 모든 임상 시험 검색하고 온라인으로 참여하기
        </Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Form onSubmit={() => alert('검색기능이 구현되지 않았습니다.')}>
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
          <IconButton>
            <CancelIcon />
          </IconButton>
          <IconButton type="submit">
            <ManageSearchIcon />
          </IconButton>
        </Form>
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
              <Typography>검색어가 없음.</Typography>
            )}
          </SearchConditionBox>
        )}
      </Box>
    </Container>
  );
}

export default App;
