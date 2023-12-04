

const Title = ({ children }) => {
    return (
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-center mt-10 ">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary1 via-primary3 to-primary4 ">
                {children}
            </span>
        </div>
    );
};

export default Title;