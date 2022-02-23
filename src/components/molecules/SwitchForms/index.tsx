import transformDashedCaseToCamelCase from '@utils/transformDashedCaseToCamelCase';
import AlolaFormIcon from '@components/atoms/formIcons/AlolaFormIcon';
import DefaultFormIcon from '@components/atoms/formIcons/DefaultFormIcon';
import GmaxFormIcon from '@components/atoms/formIcons/GmaxFormIcon';
import MegaXFormIcon from '@components/atoms/formIcons/MegaXFormIcon';
import MegaYFormIcon from '@components/atoms/formIcons/MegaYFormIcon';
import MegaFormIcon from '@components/atoms/formIcons/MegaFormIcon';
import SwordAndShieldFormIcon from '@components/atoms/formIcons/SwordAndShieldFormIcon';
import UnknownFormIcon from '@components/atoms/formIcons/UnknownFormIcon';
import Carousel from '@components/molecules/Carousel';
import { useEffect, useState } from 'react';
import CarouselItem from '@components/atoms/CarouselItem';
import styles from './styles.module.scss';

interface SwitchFormsProps {
  defaultPokemonForm: PokemonForm;
  alternativePokemonForms: PokemonForm[];
  pokemon: PokemonForm;
  handleFormChange: (form: PokemonForm) => void;
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
  handleFormChange,
}: SwitchFormsProps): JSX.Element => {
  const [formIndex, setFormIndex] = useState(0);

  function handleFormIndexChange(index: number): void {
    setFormIndex(index);
  }

  useEffect(() => {
    if (formIndex === 0) {
      handleFormChange(defaultPokemonForm);
    } else {
      handleFormChange(alternativePokemonForms[formIndex - 1]);
    }
  }, [
    alternativePokemonForms,
    defaultPokemonForm,
    formIndex,
    handleFormChange,
  ]);

  return (
    <Carousel
      myIndex={formIndex}
      updateMyIndex={handleFormIndexChange}
      tagName="ul"
      itemWidth={50}
      gap={12}
      maxItems={4}
    >
      <CarouselItem
        onClick={() => handleFormIndexChange(0)}
        buttonProps={{ disabled: pokemon.isDefault }}
      >
        <div
          className={`switchFormIcon ${
            pokemon.isDefault ? 'switchFormIcon--active' : ''
          } ${styles.iconContainer}`}
        >
          <DefaultFormIcon />
        </div>
      </CarouselItem>
      {alternativePokemonForms.map((form, index) => {
        const formName = transformDashedCaseToCamelCase(form.formName);

        return (
          <CarouselItem
            key={form.id}
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
