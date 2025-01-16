// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// const UserManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
//   const [editingUser, setEditingUser] = useState<User | null>(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://api.example.com/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleCreateUser = async () => {
//     try {
//       await axios.post('https://api.example.com/users', newUser);
//       setNewUser({ name: '', email: '', role: 'user' });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   const handleUpdateUser = async () => {
//     if (!editingUser) return;
//     try {
//       await axios.put(`https://api.example.com/users/${editingUser.id}`, editingUser);
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleDeleteUser = async (id: number) => {
//     try {
//       await axios.delete(`https://api.example.com/users/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">User Management</h2>
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold mb-2">Create User</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <select
//           value={newUser.role}
//           onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//           className="border p-2 mr-2"
//         >
//           <option value="user">User</option>
//           <option value="doctor">Doctor</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button onClick={handleCreateUser} className="bg-green-500 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </div>
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="text-left">Name</th>
//             <th className="text-left">Email</th>
//             <th className="text-left">Role</th>
//             <th className="text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button
//                   onClick={() => setEditingUser(user)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteUser(user.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingUser && (
//         <div className="mt-4">
//           <h3 className="text-xl font-semibold mb-2">Edit User</h3>
//           <input
//             type="text"
//             value={editingUser.name}
//             onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <input
//             type="email"
//             value={editingUser.email}
//             onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
//             className="border p-2 mr-2"
//           />
//           <select
//             value={editingUser.role}
//             onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
//             className="border p-2 mr-2"
//           >
//             <option value="user">User</option>
//             <option value="doctor">Doctor</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button onClick={handleUpdateUser} className="bg-yellow-500 text-white px-4 py-2 rounded">
//             Update
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.example.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      showNotification('Failed to fetch users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        showNotification('User created successfully', 'success');
        setNewUser({ name: '', email: '', role: 'user' });
        fetchUsers();
      }
    } catch (error) {
      showNotification('Failed to create user', 'error');
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`https://api.example.com/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        showNotification('User updated successfully', 'success');
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      showNotification('Failed to update user', 'error');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showNotification('User deleted successfully', 'success');
        fetchUsers();
      }
    } catch (error) {
      showNotification('Failed to delete user', 'error');
    }
  };

  const Input = ({ value, onChange, type = 'text', placeholder }: any) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
    />
  );

  const Select = ({ value, onChange }: any) => (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
    >
      <option value="user">User</option>
      <option value="doctor">Doctor</option>
      <option value="admin">Admin</option>
    </select>
  );

  const Button = ({ onClick, color, children }: any) => {
    const colors = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      red: 'bg-red-500 hover:bg-red-600',
      green: 'bg-green-500 hover:bg-green-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600'
    };

    return (
      <button
        onClick={onClick}
        className={`${colors[color]} text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      {notification.message && (
        <div className={`p-4 rounded-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
        
        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Create New User</h3>
          <div className="flex flex-wrap gap-4">
            <Input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Name"
            />
            <Input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email"
            />
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <Button onClick={handleCreateUser} color="green">
              Create User
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <Button onClick={() => setEditingUser(user)} color="blue">
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteUser(user.id)} color="red">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
              <div className="space-y-4">
                <Input
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="Name"
                />
                <Input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="Email"
                />
                <Select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                />
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => setEditingUser(null)} color="red">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateUser} color="yellow">
                    Update User
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
