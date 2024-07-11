export const inputChangeHandler = (
    e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    setFormValues: (data: any) => void,
    setPreviewPhoto?: (photo: string) => void,
    setFile?: (file: any) => void
) => {
    const { name, value } = e.target;

    setFormValues((data: any) => ({
        ...data,
        [name]: value,
    }));

    const fileInput = e.target as HTMLInputElement;

    const file = fileInput.files?.[0];
    if (fileInput && setPreviewPhoto && setFile) {
        if (file) {
            if (file.size >= 1 * 1024 * 1024 * 1024) {
                console.log("File size exceeds 1GB");

                const fileInput = document.querySelector(
                    'input[type="file"]'
                ) as HTMLInputElement;

                fileInput.value = ""; // Reset the input file field value
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewPhoto(reader.result as string);
                };
                reader.readAsDataURL(file);
                setFile(fileInput.files?.[0]);
            }
        }
    }
};
