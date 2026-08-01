module.exports = function validation(form) {
  // check name for empty string and numbers in string, punctuation, special characters, digits
  // if any are found, return an object back to the route with isValid marked as false
  // if not, return an object back to the route with true.
  const regexCheck = /[^A-Za-z]+$/;
  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (form["firstname"].trim() === "" || regexCheck.test(form["firstname"])) {
    return {
      isValid: false,
      message: "Uh oh, looks like we didn't receive a valid first name!",
    };
  } else if (
    form["lastname"].trim() === "" ||
    regexCheck.test(form["lastname"])
  ) {
    return {
      isValid: false,
      message: "Uh oh, looks like we didn't receive a valid last name!",
    };
  } else if (
    form["email"].trim() === "" ||
    regexCheckEmail.test(form["email"]) === false
  ) {
    return {
      isValid: false,
      message: "Uh oh, looks like we didn't receive a valid email!",
    };
  }

  return {
    isValid: true,
    message: "Ready to rock!",
  };
};
