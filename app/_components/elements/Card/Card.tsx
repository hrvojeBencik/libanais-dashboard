const Card = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="rounded-2xl bg-white p-16 text-center">{children}</div>
    );
};

export default Card;
