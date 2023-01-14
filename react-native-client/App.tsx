import { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { Main } from '@/main';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
};

export default App;
