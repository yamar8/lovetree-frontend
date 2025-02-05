import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, token, backendUrl } = useContext(ShopContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token }
      });
      setFormData(response.data.user);
      console.log(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      toast.error(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

      fetchProfile();
    
  }, [user, token, backendUrl]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );
      toast.success('Profile updated successfully');
      setEditMode(false);
      // Refresh profile data after update
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto p-4">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-red-600">{error}</div>
        <button 
          onClick={fetchProfile}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Personal Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <button 
            onClick={() => setEditMode(!editMode)}
            className="text-blue-600 hover:text-blue-800"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                disabled={!editMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                disabled={!editMode}
              />
            </div>

            {editMode && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <div className="space-y-4">
          <button className="text-blue-600 hover:text-blue-800 block">
            Change Password
          </button>
          <button className="text-blue-600 hover:text-blue-800 block">
            Two-Factor Authentication
          </button>
        </div>
      </div>

      {/* Order History Section */}
      {user?.orders?.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          <div className="space-y-4">
            {user.orders.map(order => (
              <div key={order._id} className="border-b pb-4">
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                <p className="text-green-600">${order.total?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;