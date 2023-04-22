/* eslint-disable react/no-array-index-key */
import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { usePokemonListContext } from 'src/presentation/contexts/PokemonListContext';
import useEscapeKeyPress from '@hooks/useEscapeKeyPress';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

import SearchIcon from '@public/icons/search.svg';
import ClearIcon from '@public/icons/close.svg';
import LoadingIcon from '@public/icons/loading.svg';

import TextField from 'src/presentation/components/TextField';
import IconButton from 'src/presentation/components/IconButton';

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

  return value.length > 0 ? (
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
  const { handleSearchValueChange, isLoading, pokemonList, searchValue } =
    usePokemonListContext();

  useEscapeKeyPress({ fn: () => setSearchInputValue('') });

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
        <div className={styles.searchInput}>
          <div className={styles.inputContainer}>
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
          </div>

          {searchValue.length > 0 && pokemonList?.[0].length > 0 && (
            <div className={styles.searchResults}>
              <ul
                className={`${styles.searchResultsContent} h-secondary-scroll ${
                  pokemonList?.[0].length > 3
                    ? styles.searchResultsContentScrollable
                    : ''
                }`}
              >
                {pokemonList?.map((list, index) => (
                  <Fragment key={index}>
                    {list.map(pokemon => (
                      <li className={styles.searchResultsItem} key={pokemon.id}>
                        <Link href={`/pokemon/${pokemon.id}`}>
                          <a className={styles.searchResultsItemLink}>
                            <span className={styles.pokemonName}>
                              {transformFirstLetterToUppercase(pokemon.name)}
                            </span>

                            <span className={styles.pokemonType}>
                              {pokemon.types.map((type, typeIndex) => (
                                <Fragment key={type}>
                                  {transformFirstLetterToUppercase(type)}{' '}
                                  {typeIndex + 1 !== pokemon.types.length &&
                                    '/'}
                                </Fragment>
                              ))}
                            </span>

                            <span className={styles.pokemonNumber}>
                              #{pokemon.id}
                            </span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchInput;
