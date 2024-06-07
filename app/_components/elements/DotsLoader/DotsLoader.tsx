interface DotsLoaderProps {
    className?: string;
}

const DotsLoader = ({ className }: DotsLoaderProps) => {
    return (
        <div className="relative">
            <div className={`${className} loader`}></div>
        </div>
    );
};

export default DotsLoader;
