export function validateProfileEdit(input) {
    const errors = {};
    let regex = /^(?=.*[A-Za-z ñ Ñ])[A-Za-z ñ Ñ]{8,35}$/
    if (!regex.test(input.fullName)) {
        console.log(regex.test(input.userName))
        errors.fullName = "Your full name must be between 8 and 35 characters long and must not contain special characters.";
    } else
        if (
            !/^[0-9]{7,15}$/.test(input.tel)
        ) {
            errors.tel = "Your cellphone number must be between 7 and 15 characters and contain only numbers.";
        } else
            if (
                !/^.{10,255}$/.test(input.description)
            ) {
                errors.description = "Your description must be between 10 and 255 characters.";
            }

    return errors;
}