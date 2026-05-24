import React from 'react';
import styled from 'styled-components';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const StyledWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.5s;
    font-size: 14px;
    padding: 0.75ch 1.5ch;
    background-color: white;
    color: #000;
    cursor: pointer;
    border: none;
    border-radius: 2px;
    box-shadow:
      2px 2px 0px hsl(0, 0%, 90%),
      4px 4px 0px hsl(0, 0%, 80%),
      6px 6px 0px hsl(0, 0%, 70%),
      8px 8px 0px hsl(0, 0%, 60%),
      10px 10px 0px hsl(0, 0%, 50%),
      12px 12px 0px hsl(0, 0%, 40%),
      14px 14px 0px hsl(0, 0%, 30%),
      16px 16px 0px hsl(0, 0%, 20%),
      18px 18px 0px hsl(0, 0%, 10%);
  }

  button:hover {
    background-color: hsl(0, 0%, 50%);
    color: #fff;
    box-shadow: none;
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default function Button3D({ children, onClick, disabled, className, type = 'button' }: Button3DProps) {
  return (
    <StyledWrapper className={className}>
      <button type={type} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </StyledWrapper>
  );
}
