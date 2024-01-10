import { fadeOut, fadeOutDown, fadeOutDownBig, fadeOutLeft, fadeOutLeftBig, fadeOutRight, fadeOutRightBig, fadeOutUp, fadeOutUpBig } from 'react-animations'
import styled, { keyframes } from 'styled-components';

export const FadeOut = styled.div`
  animation: 1s ${keyframes`${fadeOut}`};
`;

export const FadeOutDown = styled.div`
  animation: 1s ${keyframes`${fadeOutDown}`};
`;

export const FadeOutDownBig = styled.div`
  animation: 1s ${keyframes`${fadeOutDownBig}`};
`;

export const FadeOutLeft = styled.div`
  animation: 1s ${keyframes`${fadeOutLeft}`};
`;

export const FadeOutLeftBig = styled.div`
  animation: 1s ${keyframes`${fadeOutLeftBig}`};
`;

export const FadeOutRight = styled.div`
  animation: 1s ${keyframes`${fadeOutRight}`};
`;

export const FadeOutRightBig = styled.div`
  animation: 1s ${keyframes`${fadeOutRightBig}`};
`;

export const FadeOutUp = styled.div`
  animation: 1s ${keyframes`${fadeOutUp}`};
`;

export const FadeOutUpBig = styled.div`
  animation: 1s ${keyframes`${fadeOutUpBig}`};
`;
