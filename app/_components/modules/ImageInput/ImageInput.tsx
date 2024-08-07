import PlaceholderIcon from "public/assets/svg/image";
import RemoveIcon from "public/assets/svg/close";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";

interface ImageInputProps {
    className?: string;
    inputId: string;
    previewPhoto?: string;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
    error: boolean;
}

const ImageInput = ({
    className,
    inputId,
    previewPhoto,
    handleInputChange,
    error,
}: ImageInputProps) => {
    return (
        <div
            className={`${className} flex-column items-center w-1/2 mt-[28px] sm:mt-6 sm:w-full`}
        >
            <div className="mb-[58px] ml-[22px] sm:mx-0">
                {previewPhoto ? (
                    <div className="">
                        <img
                            src={previewPhoto}
                            alt=""
                            className="max-h-44 w-auto"
                        />
                    </div>
                ) : (
                    <PlaceholderIcon className="mb-16" />
                )}
            </div>
            <div className="">
                <label
                    htmlFor={inputId}
                    className="font-medium text-[12.66px] text-brown-coffee"
                >
                    Please upload picture, size less than 1GB
                </label>
                <div>
                    <input
                        id={inputId}
                        onChange={handleInputChange}
                        type="file"
                        accept="image/*"
                        name="imageUrl"
                        className="file-button file:cursor-pointer ml-[6px] file:border-[1px] mt-[6.33px] file:text-black-chocolate file:border-albescent-white file:bg-white file:rounded file:py-[6.33px] file:px-[12.66px] file:mr-[18px] file:text-[10.13px] text-[10.13px] text-brown-coffee font-medium"
                    />
                </div>
            </div>
            {error && <p className="sm:text-sm">You must select an image.</p>}
        </div>
    );
};

export default ImageInput;
