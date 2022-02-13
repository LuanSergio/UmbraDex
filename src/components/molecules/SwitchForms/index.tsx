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
      tagName="ol"
      itemWidth={50}
      gap={12}
      maxItems={6}
    >
      <li>
        <button
          onClick={() => handleFormIndexChange(0)}
          type="button"
          disabled={pokemon.isDefault}
          className={`switchFormButton ${
            pokemon.isDefault ? 'switchFormButton--active' : ''
          } ${styles.button}`}
        >
          <DefaultFormIcon />
        </button>
      </li>
      {alternativePokemonForms.map((form, index) => {
        const formName = transformDashedCaseToCamelCase(form.formName);

        return (
          <li key={form.id}>
            <button
              className={`switchFormButton ${
                form.id === pokemon.id ? 'switchFormButton--active' : ''
              } ${styles.button}`}
              disabled={form.id === pokemon.id}
              onClick={() => handleFormIndexChange(index + 1)}
              type="button"
              title={formName}
              aria-label={formName}
            >
              {forms[formName] ? forms[formName] : forms.unknown}
            </button>
          </li>
        );
      })}
    </Carousel>
  );
};

export default SwitchForms;
