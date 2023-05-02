import styled from '@emotion/styled';
import { Box, Container, TextField, Typography } from '@mui/material';

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

function App() {
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
      <Box sx={{ p: '0 4em', mb: '1em' }}>
        <Typography variant="h4" align="center" lineHeight="50px">
          국내 모든 임상 시험 검색하고 온라인으로 참여하기
        </Typography>
      </Box>
      <Box>
        <Form>
          <TextField sx={{ width: '500px' }} onChange={e => console.log(e.currentTarget.value)} />
        </Form>
      </Box>
    </Container>
  );
}

export default App;
