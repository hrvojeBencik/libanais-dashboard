import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import PlaceholderIcon from "public/assets/svg/image";
import RemoveIcon from "public/assets/svg/close";

interface ImageInputProps {
    previewPhoto?: string;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
    clearPreview: React.MouseEventHandler<HTMLButtonElement>;
}

const ImageInput = ({
    previewPhoto,
    handleInputChange,
    clearPreview,
}: ImageInputProps) => {
    return (
        <div className="flex items-center mt-12">
            <div className="h-24 w-24 mr-5 rounded-full overflow-hidden bg-gray-100">
                {!previewPhoto && <PlaceholderIcon className="p-6" />}
                {previewPhoto && (
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                        <img
                            src={previewPhoto}
                            alt=""
                            className="h-24 w-24 object-cover"
                        />
                    </div>
                )}
            </div>
            <div className=" text-left">
                <label className="font-medium text-xl text-grey-eclipse">
                    Please upload recipe image, size less than 100KB
                </label>
                <div>
                    <input
                        onChange={handleInputChange}
                        type="file"
                        accept="image/*"
                        name="photo"
                        className="mt-5 ml-2.5  file:border file:bg-white file:rounded-md file:py-2.5 file:px-5 file:mr-8 text-grey-eclipse"
                    />
                    {previewPhoto && (
                        <DefaultButton
                            onClick={clearPreview}
                            type="button"
                            className="w-4 ml-4"
                        >
                            <RemoveIcon className=" [&>*]:stroke-white" />
                        </DefaultButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageInput;
