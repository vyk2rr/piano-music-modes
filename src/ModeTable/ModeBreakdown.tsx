import type { tNoteName, tMode, tChord, tScale } from './../PianoBase/PianoBase.types';
import { MODE_INTERVAL_PATTERNS, DEGREES, MODE_ALTERATIONS } from './../PianoBase/PianoBase.types';
import { getChordColor } from './../ChordPalette/ChordPalette.utils';
import './ModeBreakdown.css';

const SVGTone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="mode-breakdown__interval-svg">
    <circle cx="12" cy="12" r="12" className="mode-breakdown__interval-circle--tone" />
    <text x="12" y="16" fontSize="12" fill="#fff" fontFamily="sans-serif" textAnchor="middle">T</text>
  </svg>
);

const SVGSemitone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="mode-breakdown__interval-svg">
    <circle cx="12" cy="12" r="12" className="mode-breakdown__interval-circle--semitone" />
    <text x="12" y="16" fontSize="12" fill="#fff" fontFamily="sans-serif" textAnchor="middle">ST</text>
  </svg>
);

const IntervalRow: React.FC<{ pattern: string[] }> = ({ pattern }) => (
  <tr>
    {pattern.map((interval, i) => (
      <td key={i} className="mode-breakdown__interval-cell">
        {interval === 'T' ? <SVGTone /> : <SVGSemitone />}
      </td>
    ))}
  </tr>
);

export interface ModeBreakdownProps {
  tonic: tNoteName,
  octaveAssignedScale: tChord,
  naturalMajorScale: tScale,
  diatonicModeScale: tScale,
  activeMode: tMode
}

const ModeBreakdown: React.FC<ModeBreakdownProps> = ({
  tonic,
  octaveAssignedScale,
  naturalMajorScale,
  diatonicModeScale,
  activeMode
}) => {
  const scaleGradientColor = tonic ? getChordColor(
    tonic,
    "maj",
    octaveAssignedScale
  ) : undefined;

  return (
    <table
      className="mode-breakdown"
      style={{
        background: scaleGradientColor,
      }}
    >
      <tbody>
        <tr>
          <td colSpan={7} className="mode-breakdown__heading">
            "{tonic}" Modo {activeMode}
          </td>
        </tr>
        <tr>
          {diatonicModeScale.map((note, i) => {
            const alt = MODE_ALTERATIONS[activeMode].find(a => a.degree === i + 1);
            const isAltered = !!alt?.alteration;
            const Tag = isAltered ? 'strong' : 'span';
            return (
              <td key={i} className={"mode-breakdown__note-cell" +
                (isAltered ? " mode-breakdown__note-cell--altered" : "")
              }
              >
                <Tag>{note}</Tag>
              </td>
            );
          })}
        </tr>
        <tr>
          {DEGREES.map((deg, i) => {
            const alt = MODE_ALTERATIONS[activeMode].find(a => a.degree === i + 1);
            const text = deg + (alt?.alteration || '');
            const Tag = alt ? 'strong' : 'span';
            return (
              <td key={deg} className={"mode-breakdown__degree-cell" +
                (alt ? " mode-breakdown__degree-cell--altered" : "")
              }
              >
                <Tag>{text}</Tag>
              </td>
            );
          })}
        </tr>
        <IntervalRow pattern={MODE_INTERVAL_PATTERNS[activeMode]} />

        <tr>
          <td colSpan={7} className="mode-breakdown__heading">
            "{tonic}" Mayor Natural 
          </td>
        </tr>
        <tr>
          {naturalMajorScale.map((note, i) => (
            <td key={i} className="mode-breakdown__note-cell">
              {note}
            </td>
          ))}
        </tr>
        <tr>
          {DEGREES.map((deg) => (
            <td key={deg} className="mode-breakdown__degree-cell">
              {deg}
            </td>
          ))}
        </tr>
        <IntervalRow pattern={MODE_INTERVAL_PATTERNS['ionian']} />
      </tbody>
    </table>
  );
};

export default ModeBreakdown;