import styles from './OptionTable.module.css';  
const OptionTable = ({ label, options, optionKey }) => {
  console.log(`OptionTable ${label}:`, options);

  return (
    <div className={styles['option-table-wrapper']}>
      <label>{label}</label>
      <div>
        <table className={styles['option-table']}>
          <thead>
            <tr>
              <th>{label} Options</th>
            </tr>
          </thead>
          <tbody>
            {options && Array.isArray(options) && options.length > 0 ? (
              options.map((option, index) => (
                <tr key={index}>
                  <td>
                    {option && option[optionKey] ? option[optionKey] : 'Unknown'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles['no-options']}>No options available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionTable;
