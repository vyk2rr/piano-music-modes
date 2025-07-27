import { BASE_NOTES, NOTES, tNoteName, tNote } from '../PianoBase/PianoBase.types';

interface iTonicSelector {
  tonic: tNoteName | undefined;
  onChange: (n: tNoteName | undefined) => void;
}

export default function TonicSelector({ tonic, onChange }: iTonicSelector) {
  return (
    <select
      data-testid="tonic-selector"
      value={tonic}
      onChange={e => onChange(e.target.value as tNoteName)}
    >
      <option value="">Selecciona tónica...</option>

      <optgroup label="Base notes">
        {BASE_NOTES.map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </optgroup>

      <optgroup label="Accidentals">
        {NOTES.filter(n => !BASE_NOTES.includes(n as tNote)).map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </optgroup>
    </select>
  );
}