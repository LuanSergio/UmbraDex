import transformDashedCaseToCamelCase from '@utils/transformDashedCaseToCamelCase';
import AlolaFormIcon from '@components/atoms/formIcons/AlolaFormIcon';
import MegaXFormIcon from '@components/atoms/formIcons/MegaXFormIcon';
import MegaYFormIcon from '@components/atoms/formIcons/MegaYFormIcon';
import MegaFormIcon from '@components/atoms/formIcons/MegaFormIcon';
import DefaultFormIcon from '@components/atoms/formIcons/DefaultFormIcon';
import GmaxFormIcon from '@components/atoms/formIcons/GmaxFormIcon';
import SwordAndShieldFormIcon from '@components/atoms/formIcons/SwordAndShieldFormIcon';
import UnknownFormIcon from '@components/atoms/formIcons/UnknownFormIcon';
import styles from './styles.module.scss';

interface SwitchFormsProps {
  defaultPokemonForm: PokemonForm;
  alternativePokemonForms: PokemonForm[];
  pokemon: PokemonForm;
  handleFormChange: (form: PokemonForm) => void;
}

const forms = {
  default: <DefaultFormIcon />,
  alola: <AlolaFormIcon />,
  mega: <MegaFormIcon />,
  megaY: <MegaYFormIcon />,
  megaX: <MegaXFormIcon />,
  gmax: <GmaxFormIcon />,
  galar: <SwordAndShieldFormIcon />,
  unknown: <UnknownFormIcon />,
};

const SwitchForms = ({
  defaultPokemonForm,
  alternativePokemonForms,
  pokemon,
  handleFormChange,
}: SwitchFormsProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => handleFormChange(defaultPokemonForm)}
        type="button"
        disabled={pokemon.isDefault}
        className={`switchFormButton ${styles.button}`}
      >
        <DefaultFormIcon />
      </button>
      {alternativePokemonForms.map(form => {
        const formName = transformDashedCaseToCamelCase(form.formName);

        return (
          <button
            className={`switchFormButton ${styles.button} ${formName}`}
            key={form.id}
            disabled={form.formName === pokemon.formName}
            onClick={() => handleFormChange(form)}
            type="button"
            title={formName}
            aria-label={formName}
          >
            {forms[formName] ? forms[formName] : forms.unknown}
          </button>
        );
      })}
    </div>
  );
};

export default SwitchForms;
