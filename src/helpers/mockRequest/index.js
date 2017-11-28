const mockRequest = (data, delay = 500) => new Promise((resolve, reject) => {
  const random = () => Math.round(Math.random() * 10);
  setTimeout(() => {
    const serverResponse = random();
    if (serverResponse < 8) {
      resolve(data);
    } else {
      reject(new Error(serverResponse));
    }
  }, delay);
});

export const parseServerError = (errorText) => {
  switch (errorText) {
    case '8': {
      return 'Take a candy and try later.';
    }
    case '9': {
      return 'Today admin is in a bad mood';
    }
    case '10': {
      return 'On this server admin schoolboy is inadequate';
    }
    default: {
      return 'Oops, something went wrong!';
    }
  }
};

export default mockRequest;
