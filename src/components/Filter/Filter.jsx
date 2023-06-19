import styles from './Filter.module.css';
import { useDispatch } from 'react-redux/es/exports';
import { filterContact } from 'redux/filter';

export function Filter() {
  const dispatch = useDispatch();

  return (
    <label className={styles.filterLabel}>
      Find contact by the name{' '}
      <input
        type="text"
        name="filter"
        onChange={evn => {
          const action = filterContact(evn.target.value);
          dispatch(action);
        }}
      ></input>
    </label>
  );
}
