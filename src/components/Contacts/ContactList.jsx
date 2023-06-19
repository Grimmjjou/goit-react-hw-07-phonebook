import styles from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from '../../redux/selector';
import { deleteContact } from '../../redux/api';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/api';
import { Audio } from 'react-loader-spinner';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const onDelete = id => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      {isLoading && <Audio className={styles.audio} />}
      {!filteredContacts?.length && !error && !isLoading && (
        <p>No contacts found.</p>
      )}
      {error && <p>{error}</p>}
      <ul className={styles.contactList}>
        {filteredContacts.map(({ id, name, number }) => (
          <li className={styles.contact} key={id}>
            {name}: {number}
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
