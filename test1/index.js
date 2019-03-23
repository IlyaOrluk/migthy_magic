
let toUp = (str, toLow) => {
    if (typeof str != 'string') {
        return console.log('Insert string plz');
    } else if (!toLow) {
        return console.log(str.slice(0,1).toLowerCase() + str.slice(1).toUpperCase());
    } else {
        return console.log(str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase());
    }
  };
toUp('Hello', false);
