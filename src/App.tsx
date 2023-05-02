import styled from '@emotion/styled';
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

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
  padding: 1rem;
  left: 0;
  right: 0;
  top: 4rem;
`;

type rSearchDataType = {
  name: string;
  id: number;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [rSearchData, setRSearchData] = useState<rSearchDataType[] | null>(null);

  const getSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .get(`/api/v1/search-conditions/?name=${e.currentTarget.value}`)
      .then(res => {
        //[FIXME]숫자 상수화 하기
        if (res.status === 200) return setRSearchData(res.data.slice(0, 7));
      })
      .catch(err => console.log(err));
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
            onChange={getSearchData}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
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
            <Typography variant="caption" color="#999DA1">
              추천 검색어
            </Typography>
            {rSearchData && (
              <Box sx={{ overflowY: 'auto', maxHeight: '300px' }}>
                <ul>
                  {rSearchData.map(list => (
                    <Typography key={list.id}>{list.name}</Typography>
                  ))}
                </ul>
              </Box>
            )}
          </SearchConditionBox>
        )}
      </Box>
    </Container>
  );
}

export default App;
