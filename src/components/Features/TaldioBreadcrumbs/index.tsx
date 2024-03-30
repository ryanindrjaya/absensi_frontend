import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

export interface BreadcrumbsPayload {
    label: string,
    url: string
}

interface BreadcrumbsInterface {
    list: BreadcrumbsPayload[],
    containerClassName?: string
}

const TaldioBreadcrumbs = ({ list, containerClassName = '' }: BreadcrumbsInterface) => {
    const linkClass = ` text-[#000]
        xs:font-inter text-[14px] xs:font-normal xs:leading-6 xs:tracking-normal xs:text-left 
        md:font-inter md:text-[16px] md:font-normal md:leading-6 md:tracking-normal md:text-left
    `;

    const activeClass = ` text-[#000]
        xs:font-inter text-[14px] font-bold xs:leading-6 xs:tracking-normal xs:text-left
        md:font-inter md:text-[16px] md:font-bold md:leading-6 md:tracking-normal md:text-left
    `;

    return (
        <>
            <Breadcrumbs aria-label='breadcrumb' className={`mb-6 ${containerClassName}`}>
                {
                    list.map((val, index) => (
                        (index + 1) === list.length ?
                            <span className={activeClass} color='text.primary' key={index}>{val.label}</span> :
                            <Link href={val.url} key={index} className={linkClass}>{val.label}</Link>
                    ))
                }
            </Breadcrumbs>
        </>
    );
};

export default TaldioBreadcrumbs;