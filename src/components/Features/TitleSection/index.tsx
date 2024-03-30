const TitleSection = ({ children, className }: any) => (
    <h1 className={`text-[16px] md:text-[28px] font-bold leading-[24px] md:leading-[36px] tracking-normal text-left m-0 ${className}`}>
        {children}
    </h1>
);

export default TitleSection;