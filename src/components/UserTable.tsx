import User from '../models/UserModel';
import UserRow from './UserRow';

type UserTableProps = {
  users: User[];
  onToggleStatus: (id: string, isActive: boolean) => void | Promise<void>;
  onChangeRole: (id: string, newRole: string) => void | Promise<void>;
};

const UserTable: React.FC<UserTableProps> = ({ users, onToggleStatus, onChangeRole }) => (
  <div className="w-full">
    {/* min-w obriga a tabela a manter espaço para os dados no mobile */}
    <table className="min-w-[800px] w-full border-separate border-spacing-0">
      <thead>
        <tr className="bg-slate-50">
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Utilizador</th>
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Contacto</th>
          <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Estado</th>
          <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Cargo / Permissão</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {users
          .filter((user) => user.id !== null)
          .map((user) => (
            <UserRow
              key={user.id as string}
              user={{ ...user, id: user.id as string }}
              onToggleStatus={onToggleStatus}
              onChangeRole={onChangeRole}
            />
          ))}
      </tbody>
    </table>
    {users.length === 0 && (
      <div className="py-10 text-center text-gray-400 text-sm">
        Nenhum utilizador encontrado.
      </div>
    )}
  </div>
);

export default UserTable;