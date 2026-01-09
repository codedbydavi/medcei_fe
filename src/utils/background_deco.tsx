const BackgroundDecoration = () => {
    return (
    <>
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-teal-100/60 rounded-full pointer-events-none" />
        <div className="absolute top-40 left-50 w-64 h-64 bg-teal-200/40 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-teal-200/40 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-100/60 rounded-full pointer-events-none" />
    </>
    );
};

export default BackgroundDecoration;