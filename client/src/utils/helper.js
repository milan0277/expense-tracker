export const storeData = (data) => {
  if (!data) {
    throw new Error("Data is not defined");
  }
  localStorage.setItem("user", JSON.stringify(data));
};

export const removeStoreData = () => {
  localStorage.removeItem('user');
};

export const getStoredData = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Invalid stored data", error);
    return null;
  }
};

export const isAuth = () => {
  const data = getStoredData();
  return !!data; 
};
