export const selectFilter = state => state.contacts.filter;
export const selectToken = state => state.users.token;
export const selectIsLogged = state => state.users.isLogged;
export const selectEmail = state => state.users.user.email;
const selectContacts = state => state.contacts.contacts;
export const selectError = state => state.contacts.error;
export const selectLoading = state => state.contacts.isLoading;
export const selectFilterdContacts = state => {
  const filter = selectFilter(state);
  const contacts = selectContacts(state);
  return filter.trim() !== ''
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase().trim())
      )
    : contacts;
};
