import styled from 'styled-components';

export const Label = styled.label`
  margin-top: 1.5em;
`;

type SmallContainerProps = {
  displayInfo: boolean;
};

export const SmallContainer = styled.div<SmallContainerProps>`
  position: absolute;
  height: 4.2em;
  width: 8em;
  border-radius: 0.2em;
  padding: 0.2em 0.5em;
  background-color: #233dff;
  right: -11em;
  bottom: -1.3em;
  ${(props) => (!props.displayInfo ? 'display: none;' : null)};
`;

export const Small = styled.small`
  margin-top: 0.4em;
  text-align: center;
  font-style: italic;
  font-size: 0.8em;
`;

type StyledInputProps = {
  error?: boolean;
};

export const Input = styled.input<StyledInputProps>`
  font-size: 1rem;
  padding: 0.5em 2em;
  text-align: center;
  margin-top: 0.4em;
  border-radius: 0.2em;
  border: 0.15em solid transparent;
  &:focus {
    border: 0.15em solid rgb(0, 132, 255);
    box-shadow: 0px 0px 0.2em 0.2em rgb(0, 132, 255);
  }
  ${(props) =>
    props.error
      ? 'border: .1em solid red; box-shadow: 0px 0px 0.15em 0.15em red'
      : typeof props.error === 'undefined'
      ? 'border: .1em solid transparent;'
      : 'border: .1em solid green; box-shadow: 0px 0px 0.15em 0.15em green'};
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
  /* background: #050a30; */
  border-radius: 0.3em;
  flex-basis: 0;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Button = styled.button`
  margin-top: 2em;
  font-size: inherit;
  border: 0px;
  background: transparent;
  color: inherit;
  padding: 0.3em 2.5em;
  border-radius: 0.2em;
  cursor: pointer;
  border: 0.1em solid white;
  &:hover {
    background-color: #233dff;
    transition: background-color 1s;
  }
`;
