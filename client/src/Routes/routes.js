const API = "http://127.0.0.1:8000/api";
const userEndpoint = `${API}/user`;
const permissionsEndpoint = `${API}/permissions`;

// users
export const addUser = `${userEndpoint}/add-user`;
export const editUser = (id) => `${userEndpoint}/edit-user/${id}`;
export const viewUsers = `${userEndpoint}`;
export const filterUsers = (filterBy, word) => `${userEndpoint}/filter-users/${filterBy}/${word}`;
export const deleteUser = (id) => `${userEndpoint}/delete-user/${id}`;
// permissions 
export const addPermissions = (id) => `${permissionsEndpoint}/assign-permissions/${id}`;
export const viewPermissions = `${permissionsEndpoint}`;
export const viewPermissionsForUser = (id) => `${permissionsEndpoint}/${id}`;

