import styled from '@emotion/styled';
import { Container, IconButton, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import { rSearchDataType } from './types/searchData';
import { checkLocalStorageExpiration, handleData } from './utils/searchData';
import SearchCondition from './components/searchCondition';
import { handleKeyDown } from './hooks/onkeyPress';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  align-items: center;
  height: 100vh;
`;

const HeadTitle = styled.div`
  padding: 0 4rem;
  margin-bottom: 2rem;
  text-align: center;
  span {
    font-size: 36px;
    line-height: 50px;
  }
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [rSearchData, setRSearchData] = useState<rSearchDataType[] | null>(null);
  const [value, setValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    setValue(term);
    setSelectedIndex(null);
    handleData(term, setRSearchData);
  };

  useEffect(checkLocalStorageExpiration, []);

  return (
    <Container maxWidth="sm">
      <Wrapper>
        <HeadTitle>
          <span>국내 모든 임상 시험 검색하고 온라인으로 참여하기</span>
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
              onKeyDown={e =>
                handleKeyDown(e, rSearchData, selectedIndex, setSelectedIndex, setValue)
              }
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
            <SearchCondition
              rSearchData={rSearchData}
              setValue={setValue}
              selectedIndex={selectedIndex}
            />
          )}
        </FormWrapper>
      </Wrapper>
    </Container>
  );
}

export default App;
