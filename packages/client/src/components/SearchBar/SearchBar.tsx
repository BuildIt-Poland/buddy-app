import React from 'react';
import { useSearch } from 'contexts/SearchContext';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import DICTIONARY from './dictionary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        color: theme.palette.primary.main,
      },
      transition: 'padding 0.5s',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    padding: {
      paddingRight: theme.spacing(3),
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resetBtn: {
      display: 'flex',
      position: 'absolute',
      transform: 'translate(0, -50%)',
      top: '50%',
      right: 0,
      zIndex: theme.zIndex.base,
      '& svg': {
        fontSize: '1.8rem',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: theme.spacing(6),
      transition: theme.transitions.create('width'),
      width: '7ch',
      '&:focus': {
        width: '10ch',
      },
      [theme.breakpoints.up('sm')]: {
        '&:focus': {
          width: '15ch',
        },
      },
    },
  })
);

const SearchBar = () => {
  const classes = useStyles();
  const { searchValue, addSearchValue, deleteSearchValue } = useSearch();
  const rootClass = searchValue
    ? `${classes.search} ${classes.padding}`
    : classes.search;

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    addSearchValue(target.value);
  };

  return (
    <div className={rootClass}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={DICTIONARY.PLACEHOLDER_TEXT}
        classes={{
          input: classes.inputInput,
        }}
        autoFocus
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange}
        value={searchValue}
      />
      {searchValue && (
        <IconButton
          aria-label='reset-search'
          onClick={deleteSearchValue}
          className={classes.resetBtn}>
          <HighlightOffOutlined />
        </IconButton>
      )}
    </div>
  );
};

export default SearchBar;
