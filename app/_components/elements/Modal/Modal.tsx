const Modal = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-opacity-20 bg-dark-gunmetal">
            {children}
        </div>
    );
};

export default Modal;
