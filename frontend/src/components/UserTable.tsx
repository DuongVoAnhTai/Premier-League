import { User } from "@/types/user";



interface GoalTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: GoalTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="border border-gray-300 px-4 py-2 text-left">Result ID</th> */}
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user) => (
              <tr key={user.id}>
              {/* <td className="border border-gray-300 px-4 py-2">{result.resultID}</td> */}
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(user)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(user.id)} className="text-red-600">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}