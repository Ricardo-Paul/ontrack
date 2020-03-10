import React from 'react'
import styled from 'styled-components'

export const CloseModalButton = styled.span`
    position: absolute;
    top: .5rem;
    right: -.2rem;
    width: 1rem;
    background: var(--main);
    cursor: pointer;
    color: whitesmoke;
    display: block;
    margin-bottom: 2rem;
    margin-right: 1rem;
    text-align: center;
    border-radius: 50%;
    width: 1.3rem;
    height: 1.3rem;
    font-size: .7rem;
    line-height: 1.3rem;

    cursor: pointer;

    &:hover {
        background-color: var(--gradient);
    }
`;

const Div = styled.div`
  margin: 40px;
  border: 5px outset pink;
  &:hover {
   background-color: yellow;
 }
`;