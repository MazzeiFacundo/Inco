export function validateProduct(input) {
    const errors = {};

    if (!/^(?=.*[A-Za-z ])[A-Za-z ]{8,35}$/.test(input.name)) {
        errors.name = "Your product name must be between 8 and 35 characters long and must not contain special characters or numbers.";
    } else

    if (!/^(?=.*[A-Za-z ])[A-Za-z ]{8,35}$/.test(input.description)) {
        errors.description = "You must enter a valid email.";
    } else

    if (!/^(?=.*[A-Za-z ])[A-Za-z ]{8,35}$/.test(input.price)) {
        errors.price = "You must enter a valid email.";
    }

    return errors;
}