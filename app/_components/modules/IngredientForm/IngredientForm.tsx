import Card from "../../elements/Card/Card";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import FormHeader from "../../elements/FormHeader/FormHeader";
import Modal from "../../elements/Modal/Modal";
import PlaceholderIcon from "public/assets/svg/image";
import RemoveIcon from "public/assets/svg/close";

import { useState } from "react";

interface IngredientFormProps {
    text?: string;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
    url?: string;
}
const IngredientForm = ({ text, handleClose, url }: IngredientFormProps) => {
    const [previewPhoto, setPreviewPhoto] = useState(url || "");

    const updatePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size >= 100 * 1024) {
                console.log("File size exceeds 100KB");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearPreview = () => {
        setPreviewPhoto(url || "");
        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ""; // Reset the input file field value
        }
    };

    return (
        <Modal>
            <Card>
                <FormHeader
                    text={text}
                    handleClose={handleClose}
                />
                <form
                    action=""
                    className="flex flex-col min-w-[1070px] gap-10"
                >
                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        Ingredient Name
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="ingredient"
                        placeholder="Enter Ingredient Name..."
                    />
                    <div className="flex items-center">
                        <div className="h-24 w-24 mr-5 rounded-full overflow-hidden bg-gray-100">
                            {!previewPhoto && (
                                <PlaceholderIcon className="p-6" />
                            )}
                            {previewPhoto && (
                                <div className="h-24 w-24 rounded-full overflow-hidden">
                                    <img
                                        src={previewPhoto}
                                        alt=""
                                        className="h-24 w-24 "
                                    />
                                </div>
                            )}
                        </div>
                        <div className=" text-left">
                            <label className="font-medium text-xl text-grey-eclipse">
                                Please upload ingredient image, size less than
                                100KB
                            </label>
                            <div>
                                <input
                                    onChange={updatePreview}
                                    type="file"
                                    accept="image/*"
                                    name="photo"
                                    className="mt-5 ml-2.5  file:border file:bg-white file:rounded-md file:py-2.5 file:px-5 file:mr-8 text-grey-eclipse"
                                />
                                {previewPhoto && (
                                    <button
                                        onClick={clearPreview}
                                        type="button"
                                        aria-label="Remove image"
                                        className="w-4 ml-4"
                                    >
                                        <RemoveIcon className=" [&>*]:stroke-white" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <DefaultButton
                    onClick={() => null}
                    text="Add Ingredient"
                    className="mt-64 mx-auto rounded-2xl px-28 py-6 text-2xl"
                />
            </Card>
        </Modal>
    );
};

export default IngredientForm;
