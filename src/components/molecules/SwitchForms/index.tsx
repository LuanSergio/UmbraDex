import transformDashedCaseToCamelCase from '@utils/transformDashedCaseToCamelCase';
import styles from './styles.module.scss';
import DefaultForm from '../../../assets/icons/default-form.svg';
import AlolaForm from '../../../assets/icons/alola-form.svg';
import MegaForm from '../../../assets/icons/mega-form.svg';
import GmaxForm from '../../../assets/icons/gmax-form.svg';
import SwordAndShieldForm from '../../../assets/icons/sword-and-shield-form.svg';
import UnknownForm from '../../../assets/icons/unknown-form.svg';

interface SwitchFormsProps {
  defaultPokemonForm: PokemonForm;
  alternativePokemonForms: PokemonForm[];
  pokemon: PokemonForm;
  handleFormChange: (form: PokemonForm) => void;
}

const forms = {
  default: <DefaultForm />,
  alola: <AlolaForm />,
  mega: <MegaForm />,
  megaY: <MegaForm />,
  megaX: <MegaForm />,
  gmax: <GmaxForm />,
  galar: <SwordAndShieldForm />,
  unknown: <UnknownForm />,
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
        <DefaultForm />
      </button>
      {alternativePokemonForms.map(form => {
        const formName = transformDashedCaseToCamelCase(form.formName);

        return (
          <button
            className={`switchFormButton ${styles.button}`}
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
