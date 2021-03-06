import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: 100px;
    background: var(--darkGrey);
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    max-width: var(--maxWidth);
    margin: 0 auto;

    .coloum {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--medGrey);
        border-radius: 20px;
        margin: 0 20px;
        flex: 1;

        :first-child {margin-left: 0;}
        :last-child {margin-right: 0;}

        @media screen and (max-width: 768px) {
            display: block;

            .coloum {margin: 20px 0;}
        }
    }
`;