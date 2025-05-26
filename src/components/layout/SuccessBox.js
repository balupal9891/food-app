export default function SuccessBox({children}){
    return(
        <div className="text-center bg-green-300 border-green-600 p-3 mx-auto my-2">
            {children}
        </div>
    );
}