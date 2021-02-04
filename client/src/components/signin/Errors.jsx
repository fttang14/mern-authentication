// jshint esversion:10

export const handleErrors = async (res) => {
  const { ok, message } = await res.data;
  if (!ok) {
    throw Error(message);
  }
  return res;
};
