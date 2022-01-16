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
  return (
    <Carousel tagName="ul" itemWidth={50} gap={16}>
      <li>
        <button
          onClick={() => handleFormChange(defaultPokemonForm)}
          type="button"
          disabled={pokemon.isDefault}
          className={`switchFormButton ${
            pokemon.isDefault ? 'switchFormButton--active' : ''
          } ${styles.button}`}
        >
          <DefaultFormIcon />
        </button>
      </li>
      {alternativePokemonForms.map(form => {
        const formName = transformDashedCaseToCamelCase(form.formName);

        return (
          <li key={form.id}>
            <button
              className={`switchFormButton ${
                form.id === pokemon.id ? 'switchFormButton--active' : ''
              } ${styles.button}`}
              disabled={form.id === pokemon.id}
              onClick={() => handleFormChange(form)}
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
