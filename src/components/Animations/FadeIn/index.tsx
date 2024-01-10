import { fadeIn, fadeInDown, fadeInDownBig, fadeInLeft, fadeInLeftBig, fadeInRight, fadeInRightBig, fadeInUp, fadeInUpBig } from 'react-animations'
import styled, { keyframes } from 'styled-components';

const fadeInAnimation = keyframes`${fadeIn}`;

const FadeIn = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeInDown}`};
`;

const FadeInDownBig = styled.div`
  animation: 1s ${keyframes`${fadeInDownBig}`};
`;

const FadeInLeft = styled.div`
  animation: 1s ${keyframes`${fadeInLeft}`};
`;

const FadeInLeftBig = styled.div`
  animation: 1s ${keyframes`${fadeInLeftBig}`};
`;

const FadeInRight = styled.div`
  animation: 1s ${keyframes`${fadeInRight}`};
`;

const FadeInRightBig = styled.div`
  animation: 1s ${keyframes`${fadeInRightBig}`};
`;

const FadeInUp = styled.div`
  animation: 1s ${keyframes`${fadeInUp}`};
`;

const FadeInUpBig = styled.div`
  animation: 1s ${keyframes`${fadeInUpBig}`};
`;

export { FadeIn };