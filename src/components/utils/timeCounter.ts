export const timeCounter = (returnTime: string) => {
  if (returnTime) {
    const date = new Date(returnTime);
    const diff = date.getTime() - Date.now();

    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;

    return `${days < 10 ? '0' + days : days}:${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  }
};
