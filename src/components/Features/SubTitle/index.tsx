const SubTitle = ({ children, className }: any) => (
    <h2 className={`font-inter text-[12px] md:text-[22px] font-normal leading-[16px] md:leading-[28px] tracking-normal text-left text-[#646464] m-0 ${className}`}>
        {children}
    </h2>
);

export default SubTitle;