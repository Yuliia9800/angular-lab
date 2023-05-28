export const pipeDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const hoursMessage = hours ? hours + 'h' : '';
  const minutesMessage = minutes ? minutes + 'min' : '';

  return `${hoursMessage} ${minutesMessage}`;
};
