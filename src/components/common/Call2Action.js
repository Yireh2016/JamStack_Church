import React from "react";
import styled from "styled-components";

const Call2Action = ({ children, onClick }) => (
    <Button onClick={onClick}>{children}</Button>
);

export default Call2Action;

const Button = styled.button`
    background: transparent;
    border: 3px solid ${({ theme }) => theme.color.dorado};
    padding: 15px 20px;
    margin: 15px 0 0 0;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.color.blanco};

    font-size: 24px;

    :hover {
        cursor: pointer;
    }
`;
