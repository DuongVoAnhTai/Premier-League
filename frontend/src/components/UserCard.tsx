export default function UserCard ({type}:{type:string}){
    return (
        <div className="rounded-2xl odd:bg-[#CFCEFF] even:bg-[#FAE27C] p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
            </div>
            <h1 className="text-2xl font-semibold my-4">20</h1>
        </div>
    )
}