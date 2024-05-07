const validateForm = (data: any) => {
    const errors: any = {};
    Object.keys(data).forEach((field) => {
        if (data[field].trim() === "") {
            errors[field] = true;
        } else {
            errors[field] = false;
        }
    });
    return errors;
};

export default validateForm;
