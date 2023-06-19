import React from 'react';
import styles from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/api';
import { selectContacts } from 'redux/selector';
import { toast } from 'react-toastify';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: e.currentTarget.elements.name.value,
      number: e.currentTarget.elements.number.value,
    };

    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) {
      return toast.warn(`${contact.name} is already in contacts.`);
    }
    dispatch(addContact(contact));
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p htmlFor={nanoid()}>
        Name
        <input
          type="text"
          className={styles.input}
          name="name"
          id={nanoid()}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </p>
      <p htmlFor={nanoid()}>
        <input
          type="tel"
          className={styles.input}
          name="number"
          id={nanoid()}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </p>
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
