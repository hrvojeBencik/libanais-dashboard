import PlaceholderIcon from "public/assets/svg/image";
import RemoveIcon from "public/assets/svg/close";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";

interface ImageInputProps {
    className?: string;
    previewPhoto?: string;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ImageInput = ({
    className,
    previewPhoto,
    handleInputChange,
}: ImageInputProps) => {
    return (
        <div
            className={`${className} flex-column items-center w-1/2 mt-[28px]`}
        >
            <div className="mb-[58px] ml-[22px]">
                {!previewPhoto && <PlaceholderIcon className="mb-16" />}
                {previewPhoto && (
                    <div className="">
                        <img
                            src={previewPhoto}
                            alt=""
                            className=""
                        />
                    </div>
                )}
            </div>
            <div className="">
                <label className="font-medium text-[12.66px] text-brown-coffee">
                    Please upload picture, size less than 1GB
                </label>
                <div>
                    <input
                        onChange={handleInputChange}
                        type="file"
                        accept="image/*"
                        name="photo"
                        className="file-button ml-[6px] file:border-[1px] mt-[6.33px] file:text-black-chocolate file:border-albescent-white file:bg-white file:rounded file:py-[6.33px] file:px-[12.66px] file:mr-[18px] file:text-[10.13px] text-[10.13px] text-brown-coffee font-medium"
                    />
                    {/* {previewPhoto && (
                        <DefaultButton
                            onClick={clearPreview}
                            type="button"
                            className="w-4 ml-4"
                        >
                            <RemoveIcon className=" [&>*]:stroke-white" />
                        </DefaultButton>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default ImageInput;
