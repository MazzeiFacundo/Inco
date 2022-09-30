export function validateRegister(input) {
    const errors = {};
    let regex = /^(?=.*[A-Za-z ñ Ñ])[A-Za-z ñ Ñ]{8,35}$/
    if (!regex.test(input.fullName)) {
        console.log(regex.test(input.userName))
        errors.fullName = "Your full name must be between 8 and 35 characters long and must not contain special characters.";
    } else
        if (!/^(?=.*[A-Za-z ñ Ñ])[ A-Za-z ñ Ñ\d@$!%*#?&^_-]{3,20}$/.test(input.userName)) {
            errors.userName = "Your user name must be between 3 and 20 characters long and must not contain dots.";
        } else
            if (
                !/^(?=.*[A-Za-z ñ Ñ])(?=.*\d)[A-Za-z ñ Ñ\d@$!%*#?&^_-]{8,15}$/.test(input.password)
            ) {
                errors.password = "Your password must be between 8 and 15 characters and contain at least one number.";
            } else
                if (
                    !/^[0-9]{7,15}$/.test(input.tel)
                ) {
                    console.log("error")
                    errors.tel = "Your cellphone number must be between 7 and 15 characters and contain only numbers.";
                }
                else
                    if (
                        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                            input.email
                        )
                    ) {
                        errors.email = "You must enter a valid email.";
                    }

    return errors;
}