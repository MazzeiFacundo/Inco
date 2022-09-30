export function validateEditProduct(input) {
    const errors = {};

    if (!/^(?=.*[A-Za-z ])[A-Za-z ]{8,35}$/.test(input.name)) {
        errors.name = "Your product name must be between 8 and 35 characters long and must not contain special characters or numbers.";
    } else
        if (!/^[0-9]{4,9}$/.test(input.price)) {
            errors.price = "Property price must be between 4 and 9 characters long and must only contain numbers.";
        } else
            if (!/^[A-Za-z0-9 ]{3,35}$/.test(input.location)) {
                errors.location = "Property location must be between 3 and 35 characters long and must only contain letters or numbers.";
            } else
                if (!/^(?=.*[A-Za-z ])[A-Za-z ]{10,255}$/.test(input.description)) {
                    errors.description = "Property description must be between 10 and 255 characters long.";
                } else
                    if (!/^[0-9]{1,2}$/.test(input.rooms)) {
                        errors.rooms = "Property accomodations must be between 1 and 2 characters long and must only contain numbers.";
                    } else
                        if (!/^[0-9]{1,2}$/.test(input.dorms)) {
                            errors.dorms = "Property accomodations must be between 1 and 2 characters long and must only contain numbers.";
                        } else
                            if (!/^[0-9]{1,2}$/.test(input.bathrooms)) {
                                errors.bathrooms = "Property accomodations must be between 1 and 2 characters long and must only contain numbers.";
                            } else
                                if (!/^[0-9]{1,4}$/.test(input.productWidth)) {
                                    errors.productWidth = "Property measurements must be between 1 and 4 characters long and must only contain numbers.";
                                } else
                                    if (!/^[0-9]{1,4}$/.test(input.productHeight)) {
                                        errors.productHeight = "Property measurements must be between 1 and 4 characters long and must only contain numbers.";
                                    } else
                                        if (!/^.{2,}$/.test(input.typeOfProduct)) {
                                            errors.typeOfProduct = "You must select a property type.";
                                        } else
                                            if (!/^.{2,}$/.test(input.typeOfDeal)) {
                                                errors.typeOfDeal = "You must select a deal.";
                                            }
    return errors;
}