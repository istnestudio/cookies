const getStringBoolValue = (bool?: string) => {
  if (!bool) return false;

  const dict: { [key: string]: boolean } = {
    true: true,
    false: false,
    default: false,
  };

  return dict[bool] || dict.default;
};

export default getStringBoolValue;
