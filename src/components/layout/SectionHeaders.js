
export default function SectionHeaders({subHeader, mainHeader}) {
    return (
        <>
            <h3 className="uppercase text-gray-500 font-semibold leadin-4">
                {subHeader}
            </h3>
            <h2 className='text-red-600 font-bold text-4xl'>
                {mainHeader}
            </h2></>
    );
}