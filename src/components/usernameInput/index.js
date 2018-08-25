import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ClassNames from 'classnames';
import LoadingImage from '../../resources/images/reactLogo.svg';
import Tooltip from '@material-ui/core/Tooltip';
import './usernameInput.css';

const usernameInput = ({username, onUsernameInputChanged, onClickFetch, isLoading, isValid}) => {
  const validationAdornment = (<InputAdornment position="end">
    {username && !isValid &&  
    <Tooltip title="Enter a valid username or publication" placement="top">
      <span role="img" aria-label="invalid">⚠️</span>
    </Tooltip>}
  </InputAdornment>);

  return ([<FormControl key="input"
                        fullWidth 
                        className="User-name-input" 
                        variant="extendedFab"
                        onKeyPress={ event => {if(isValid && !isLoading && event.key === 'Enter') onClickFetch()}}>
      <Input
      id="adornment-amount"
      placeholder="username"
      disableUnderline={true} 
      value={username}
      onChange={onUsernameInputChanged}
      startAdornment={<InputAdornment position="start">medium.com/feed/</InputAdornment>}
      endAdornment={validationAdornment}      />
    </FormControl>,
    <Button key="button"
            className="fetch-button" 
            variant="extendedFab"
            color="secondary"
            disabled = {isLoading || !isValid || !username}
            onClick={onClickFetch}>
      { !isLoading? "Fetch" : "Loading"}
      <img className={ClassNames("loading", { "hidden": !isLoading })} src={LoadingImage} alt="react logo" />
  </Button>])
}

export default usernameInput;