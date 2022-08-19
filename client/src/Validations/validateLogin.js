export function validate(input) {
  const errors = {};
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      input.email
    )
  ) {
    errors.email = "You must enter a valid email.";

  // if (
  //   !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.password)
  // ) {
  //   errors.password = "Your password must be between 8 and 15 characters.";
  }

  return errors;
}
