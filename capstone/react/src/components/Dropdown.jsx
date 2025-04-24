const Dropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  optionKey,
  optionValue,
}) => {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option[optionValue]}>
            {option[optionKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
