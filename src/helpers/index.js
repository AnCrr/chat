export const isIncorrectFormData = (formData) =>
  Object.values(formData).some((item) => item.length < 3);

export const getLoginUrl = () => "/login";

const getHash = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const generateBackgroundColorClass = (value) => {
  const hash = getHash(String(value));
  return `dialog__ava_color${Math.abs(hash) % 10}`;
};

export const getDate = (timestamp) => {
  const time = new Date(+timestamp);
  let minutes = time.getMinutes();
  return `${time.getHours()}:${minutes < 10 ? "0" + minutes : minutes}`;
};
