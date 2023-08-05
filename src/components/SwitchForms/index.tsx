import { useEffect, useState } from 'react';

import PokemonForm from '@domain/entities/PokemonForm';
import transformDashedCaseToCamelCase from '@utils/transformDashedCaseToCamelCase';

import AlolaFormIcon from '@components/FormIcons/AlolaFormIcon';
import ShinyIcon from '@public/icons/shiny.svg';
import DefaultFormIcon from '@components/FormIcons/DefaultFormIcon';
import GmaxFormIcon from '@components/FormIcons/GmaxFormIcon';
import MegaXFormIcon from '@components/FormIcons/MegaXFormIcon';
import MegaYFormIcon from '@components/FormIcons/MegaYFormIcon';
import MegaFormIcon from '@components/FormIcons/MegaFormIcon';
import SwordAndShieldFormIcon from '@components/FormIcons/SwordAndShieldFormIcon';
import UnknownFormIcon from '@components/FormIcons/UnknownFormIcon';
import Carousel from '@components/Carousel';
import CarouselItem from '@components/CarouselItem';

import styles from './styles.module.scss';

interface SwitchFormsProps {
  defaultPokemonForm: PokemonForm;
  alternativePokemonForms: PokemonForm[];
  pokemon: PokemonForm;
  isShiny: boolean;
  handleFormChange: (form: PokemonForm) => void;
  handleIsShiny: (shouldBeShiny: boolean) => void;
}

const forms = {
  alola: <AlolaFormIcon />,
  default: <DefaultFormIcon />,
  gmax: <GmaxFormIcon />,
  galar: <SwordAndShieldFormIcon />,
  mega: <MegaFormIcon />,
  megaX: <MegaXFormIcon />,
  megaY: <MegaYFormIcon />,
  unknown: <UnknownFormIcon />,
};

const SwitchForms = ({
  defaultPokemonForm,
  alternativePokemonForms,
  pokemon,
  isShiny,
  handleFormChange,
  handleIsShiny,
}: SwitchFormsProps): JSX.Element => {
  const [formIndex, setFormIndex] = useState(0);

  function handleFormIndexChange(index: number): void {
    setFormIndex(index);
    handleIsShiny(false);
  }

  function handleShinyFormClick(): void {
    handleIsShiny(true);
    setFormIndex(0);
  }

  // Change back to default form when pokemon changes
  useEffect(() => {
    if (pokemon.isDefault) {
      setFormIndex(0);
      handleIsShiny(false);
    }
  }, [pokemon.isDefault]);

  // Change form
  useEffect(() => {
    if (formIndex === 0) {
      handleFormChange(defaultPokemonForm);
      return;
    }

    handleFormChange(alternativePokemonForms[formIndex - 1]);
  }, [
    alternativePokemonForms,
    defaultPokemonForm,
    formIndex,
    handleFormChange,
  ]);

  return (
    <Carousel
      currentIndex={formIndex}
      updateCurrentIndex={handleFormIndexChange}
      tagName="ul"
      itemWidth={50}
      gap={12}
      maxItems={4}
      maxPositionIndex="auto"
    >
      <CarouselItem
        tagName="li"
        onClick={() => handleFormIndexChange(0)}
        buttonProps={{ disabled: pokemon.isDefault && !isShiny }}
      >
        <div
          className={`switchFormIcon ${
            pokemon.isDefault && !isShiny ? 'switchFormIcon--active' : ''
          } ${styles.iconContainer}`}
        >
          <DefaultFormIcon />
        </div>
      </CarouselItem>

      <CarouselItem
        tagName="li"
        onClick={() => handleShinyFormClick()}
        buttonProps={{ disabled: pokemon.isDefault && isShiny }}
      >
        <div
          className={`switchFormIcon ${
            pokemon.isDefault && isShiny ? 'switchFormIcon--active' : ''
          } ${styles.iconContainer}`}
        >
          <ShinyIcon className={`${styles.shinyIcon} shiny`} />
        </div>
      </CarouselItem>

      {alternativePokemonForms.map((form, index) => {
        const formName = transformDashedCaseToCamelCase(form.formName);

        return (
          <CarouselItem
            key={form.id}
            tagName="li"
            onClick={() => handleFormIndexChange(index + 1)}
            buttonProps={{ disabled: form.id === pokemon.id }}
          >
            <div
              className={`switchFormIcon ${
                form.id === pokemon.id ? 'switchFormIcon--active' : ''
              } ${styles.iconContainer}`}
              title={formName}
              aria-label={formName}
            >
              {forms[formName] ? forms[formName] : forms.unknown}
            </div>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default SwitchForms;
