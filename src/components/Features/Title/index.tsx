const Title = ({ children, className }: any) => (
    <h1 className={`text-[22px] md:text-[36px] font-bold leading-[28px] md:leading-[44px] tracking-normal text-left m-0 ${className}`}>
        {children}
    </h1>
);

export default Title;