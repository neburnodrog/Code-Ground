import styled from 'styled-components';

type StyledInputProps = {
  error: boolean;
};

export const Label = styled.label`
  margin-top: 1.5em;
`;

export const Small = styled.small`
  margin-top: 0.4em;
  text-align: center;
  color: gray;
  font-style: italic;
  font-size: 0.8em;
`;

export const Input = styled.input<StyledInputProps>`
  font-size: inherit;
  padding: 0.5em 2em;
  text-align: center;
  margin-top: 0.4em;
  border-radius: 0.2em;
  border: 0.15em solid transparent;
  &:focus {
    border: 0.15em solid lightblue;
    box-shadow: 0px 0px 0.15em 0.15em lightblue;
  }
  ${(props) =>
    props.error ? 'border: .15em solid red' : 'border: .15em solid green'};
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  padding: 2em;
  background: #050a30;
  border-radius: 0.3em;
  flex-basis: 0;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type StyledButtonProps = {
  border: boolean;
};

export const Button = styled.button<StyledButtonProps>`
  font-size: inherit;
  border: 0px;
  background: transparent;
  color: inherit;
  padding: 0.3em 1.5em;
  border-radius: 0.2em;
  ${(props) =>
    props.border
      ? 'border: .2em solid white'
      : 'border: .2em solid transparent'};
  &:hover {
    background-color: #233dff;
  }
  transition: background-color 1s;
`;
