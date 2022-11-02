import { useEffect, useRef, useState } from 'react';

import { usePokemonListContext } from '@contexts/PokemonListContext';

import SearchIcon from '@public/icons/search.svg';
import ClearIcon from '@public/icons/close.svg';
import LoadingIcon from '@public/icons/loading.svg';
import TextField from '@components/atoms/TextField';
import IconButton from '@components/atoms/IconButton';

import styles from './styles.module.scss';

interface ISearchInputIconProps {
  isLoading: boolean;
  value: string;
  setInputValue: (value: string) => void;
  setInputFocus: () => void;
}

const SearchInputIcon = ({
  isLoading,
  value,
  setInputValue,
  setInputFocus,
}: ISearchInputIconProps): JSX.Element => {
  function clearInputValue() {
    setInputValue('');
  }

  if (isLoading) {
    return (
      <IconButton
        theme="secondary"
        label="Search"
        aria-label="Search"
        type="button"
        props={{
          disabled: true,
        }}
      >
        <LoadingIcon className={`${styles.searchInputIcon}`} />
      </IconButton>
    );
  }

  return value.length ? (
    <IconButton
      theme="secondary"
      label="Search"
      aria-label="Search"
      type="button"
      props={{
        onClick: clearInputValue,
      }}
    >
      <ClearIcon
        className={`${styles.searchInputIcon} ${styles.searchInputIconActive}`}
      />
    </IconButton>
  ) : (
    <IconButton
      label="Search"
      aria-label="Search"
      type="button"
      props={{ onClick: setInputFocus }}
    >
      <SearchIcon className={styles.searchInputIcon} />
    </IconButton>
  );
};

interface ISearchInputProps {
  isOpen: boolean;
}

const SearchInput = ({ isOpen }: ISearchInputProps): JSX.Element => {
  const searchRef = useRef(null);
  const [searchInputValue, setSearchInputValue] = useState('');
  const { handleSearchValueChange, isLoading } = usePokemonListContext();

  function handleSearchInputChange(value: string) {
    setSearchInputValue(value);
  }

  function setSearchInputFocus() {
    searchRef.current.focus();
  }

  useEffect(() => {
    handleSearchValueChange(searchInputValue);
  }, [handleSearchValueChange, searchInputValue]);

  useEffect(() => {
    if (isOpen) setSearchInputFocus();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <TextField
          value={searchInputValue}
          label="Search..."
          theme="secondary"
          inputProps={{
            spellCheck: 'false',
            onChange: event => handleSearchInputChange(event.target.value),
          }}
          adornment={
            <SearchInputIcon
              isLoading={isLoading}
              value={searchInputValue}
              setInputValue={setSearchInputValue}
              setInputFocus={setSearchInputFocus}
            />
          }
          ref={searchRef}
        />
      )}
    </>
  );
};

export default SearchInput;
