import { fadeIn, fadeInUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';


const FadeIn = styled.div`
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-name: ${keyframes`${fadeIn}`};
`;

const FadeInUp = styled.div`
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-name: ${keyframes`${fadeInUp}`}
`;

export { FadeIn, FadeInUp };