const validateForm = (data: any) => {
    const errors: any = {};
    Object.keys(data).forEach((field) => {
        // Check if the field value is a string before calling trim
        if (typeof data[field] === "string") {
            if (data[field].trim() === "") {
                errors[field] = true;
            } else {
                errors[field] = false;
            }
        } else {
            // If it's not a string, check if it's empty or undefined
            if (!data[field]) {
                errors[field] = true;
            } else {
                errors[field] = false;
            }
        }
    });
    return errors;
};

export default validateForm;
