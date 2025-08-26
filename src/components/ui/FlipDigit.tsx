interface FlipDigitProps {
  value: number;
  label: string;
  showSeparator?: boolean;
}

const FlipDigit = ({ value, label, showSeparator = false }: FlipDigitProps) => {
  const formattedValue = String(value).padStart(2, '0');

  return (
    <div className="time-group">
      <div className="digit-container">
        <div className="digit">{formattedValue}</div>
      </div>
      {showSeparator && <div className="separator" aria-hidden>:</div>}
      <div className="label">{label}</div>
    </div>
  );
};

export default FlipDigit;
