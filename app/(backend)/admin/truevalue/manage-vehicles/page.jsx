'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/truevalue', { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch vehicles');

      setVehicles(Array.isArray(data.vehicles) ? data.vehicles : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ✅ Delete vehicle
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const res = await fetch(`/api/admin/truevalue/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setVehicles((prev) => prev.filter((v) => v._id !== id));
        toast.success('Vehicle deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete vehicle');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting vehicle');
    }
  };

  // ✅ Start editing
  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setEditedData({ ...vehicle });
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ url: reader.result });
            reader.readAsDataURL(file);
          })
      )
    ).then((newImages) => {
      setEditedData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    });
  };

  // ✅ Save updates (PUT)
  const handleSave = async (id) => {
    try {
      console.log('🟦 Edited data being sent:', editedData); // ✅ debug log

      const res = await fetch(`/api/admin/truevalue/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedData,
          images: editedData.images || [],
        }),
      });

      const text = await res.text();
      console.log('🟩 Raw response text:', text); // ✅ debug log

      if (!text) {
        toast.error('Empty response from server');
        return;
      }

      const data = JSON.parse(text);
      if (data.success) {
        toast.success('Vehicle updated successfully');
        setVehicles((prev) =>
          prev.map((v) => (v._id === id ? data.vehicle : v))
        );
        setEditingId(null);
        setEditedData({});
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error('❌ handleSave failed:', err);
      toast.error('Unexpected error updating vehicle');
    }
  };

  if (loading) return <p className='py-10 text-center'>Loading vehicles...</p>;
  if (error) return <p className='text-center text-red-500'>Error: {error}</p>;

  return (
    <div className='p-6'>
      <h1 className='mb-6 text-2xl font-bold text-gray-800'>
        Manage True Value Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <p className='text-gray-500'>No vehicles found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-200 rounded-lg shadow-md'>
            <thead className='bg-gray-100'>
              <tr className='text-sm font-semibold text-gray-700'>
                <th className='px-4 py-2 border'>#</th>
                <th className='px-4 py-2 border'>Photos</th>
                <th className='px-4 py-2 border'>Name</th>
                <th className='px-4 py-2 border'>Price</th>
                <th className='px-4 py-2 border'>Fuel</th>
                <th className='px-4 py-2 border'>KMs</th>
                <th className='px-4 py-2 border'>Transmission</th>
                <th className='px-4 py-2 border'>Status</th>
                <th className='px-4 py-2 border'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((v, i) => (
                <tr
                  key={v._id}
                  className='transition border-b hover:bg-gray-50'
                >
                  <td className='px-4 py-2 text-center border'>{i + 1}</td>

                  {/* ✅ All Images */}
                  <td className='px-4 py-2 text-center border'>
                    <div className='flex gap-1 overflow-x-auto'>
                      {(editingId === v._id
                        ? editedData.images
                        : v.images
                      )?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url || '/no-image.jpg'}
                          alt={`car-${idx}`}
                          className='object-cover w-16 h-12 border rounded-md'
                        />
                      ))}
                    </div>

                    {editingId === v._id && (
                      <input
                        type='file'
                        accept='image/*'
                        multiple
                        className='mt-1 text-xs'
                        onChange={handleImageChange}
                      />
                    )}
                  </td>

                  {/* ✅ Editable Fields */}
                  {['name', 'price', 'fuel', 'kms', 'transmission'].map(
                    (field) => (
                      <td key={field} className='px-4 py-2 text-center border'>
                        {editingId === v._id ? (
                          <input
                            type={field === 'price' ? 'number' : 'text'}
                            name={field}
                            value={editedData[field] || ''}
                            onChange={handleChange}
                            className='w-full px-2 py-1 text-center border rounded-md'
                          />
                        ) : field === 'price' ? (
                          `₹${new Intl.NumberFormat('en-IN').format(
                            v.price || 0
                          )}`
                        ) : (
                          v[field] || '-'
                        )}
                      </td>
                    )
                  )}

                  {/* ✅ Status */}
                  <td className='px-4 py-2 text-center border'>
                    {editingId === v._id ? (
                      <select
                        name='published'
                        value={editedData.published}
                        onChange={(e) =>
                          setEditedData((prev) => ({
                            ...prev,
                            published: e.target.value === 'true',
                          }))
                        }
                        className='px-2 py-1 text-sm border rounded-md'
                      >
                        <option value='true'>Published</option>
                        <option value='false'>Draft</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          v.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {v.published ? 'Published' : 'Draft'}
                      </span>
                    )}
                  </td>

                  {/* ✅ Actions */}
                  <td className='px-4 py-2 text-center border'>
                    <div className='flex justify-center gap-3'>
                      {editingId === v._id ? (
                        <>
                          <button
                            onClick={() => handleSave(v._id)}
                            className='p-2 text-green-600 hover:text-green-800'
                            title='Save'
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={handleCancel}
                            className='p-2 text-gray-600 hover:text-gray-800'
                            title='Cancel'
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(v)}
                            className='p-2 text-blue-600 hover:text-blue-800'
                            title='Edit'
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(v._id)}
                            className='p-2 text-red-600 hover:text-red-800'
                            title='Delete'
                          >
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
