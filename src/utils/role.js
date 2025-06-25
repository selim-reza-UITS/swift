// const getRole = () => {
//   const persistedState = JSON.parse(localStorage.getItem("persist:root"));
//   if (!persistedState || !persistedState.auth) return null;

//   const auth = JSON.parse(persistedState.auth);
//   const user = auth.user;

//   // Check for admin role
//   if (user?.role) return user.role;

//   // Check for student role (nested inside user.user)
//   if (user?.user?.role) return user.user.role;

//   return null;
// };

// export default getRole;
           
const getRole = () => {
  const role = localStorage.getItem("userRole");
  if (!role) return null;
  console.log("User Data:", role);
  // Direct role inside user object
  if (role) return role;

  return null;
};

export default getRole;
      