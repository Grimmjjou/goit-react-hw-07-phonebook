import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './Contacts/ContactList';
import { Filter } from './Filter/Filter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <ContactForm />
      <Filter />
      <ContactList />
      <ToastContainer position="top-center" />
    </>
  );
}
