import './App.css';
import Counter from './Counter';
import Hello from './Hello';
import InputSample from './InputSample';
import Wrapper from './Wrapper';


function App() {
  return (
    <>
    <Wrapper>
      <Hello color="red" name="SeoWS2" isSpecial/>
      <Hello/>
    </Wrapper>
    <Counter />
    <InputSample />
   </>
  );
}

export default App;
