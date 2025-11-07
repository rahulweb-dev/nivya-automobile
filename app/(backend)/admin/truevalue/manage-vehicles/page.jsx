'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaCar,
  FaPlus,
} from 'react-icons/fa';
import PostVehicle from '../post-vehicle/page';

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // ✅ Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/truevalue', { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch vehicles');
      setVehicles(Array.isArray(data.vehicles) ? data.vehicles.filter(Boolean) : []);
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
      const res = await fetch(`/api/admin/truevalue/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Vehicle deleted successfully');
        await fetchVehicles(); // auto-refresh list
      } else toast.error(data.error || 'Failed to delete vehicle');
    } catch (err) {
      console.error(err);
      toast.error('Error deleting vehicle');
    }
  };

  // ✅ Start editing
  const handleEdit = (vehicle) => {
    if (!vehicle?._id) return;
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

  // ✅ Handle image uploads (preview)
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

  // ✅ Remove image
  const handleRemoveImage = (index) => {
    setEditedData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ✅ Save updated vehicle
  const handleSave = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/admin/truevalue/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedData,
          images: editedData.images || [],
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Vehicle updated successfully');
        await fetchVehicles(); // 🔄 Auto-refresh from DB
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

  if (loading) return <p className="py-10 text-center">Loading vehicles...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="relative z-30 min-h-screen p-6 bg-gray-50">
      <h1 className="relative z-50 mb-6 text-3xl font-semibold text-center text-gray-800">
        Manage True Value Vehicles
      </h1>

      {/* ✅ Add Vehicle Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FaPlus /> {showAddForm ? 'Close Form' : 'Add Vehicle'}
        </button>
      </div>

      {/* ✅ Add Vehicle Form */}
      {showAddForm && (
        <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
            <FaCar /> Add New Vehicle
          </h2>
          {/* 👇 Pass callback to auto-refresh list after new vehicle is added */}
          <PostVehicle onVehicleAdded={fetchVehicles} />
        </div>
      )}

      {/* ✅ Vehicle List */}
      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vehicles
            .filter((v) => v && v._id)
            .map((v) => (
              <div
                key={v._id}
                className="transition-all duration-300 bg-white border border-gray-200 shadow rounded-2xl hover:shadow-lg"
              >
                {/* ✅ Image Gallery */}
                <div className="flex gap-2 p-3 overflow-x-auto bg-gray-100 rounded-t-2xl">
                  {(editingId === v._id
                    ? editedData.images
                    : v.images || []
                  ).map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img?.url || '/no-image.jpg'}
                        alt={`car-${idx}`}
                        className="object-cover w-40 border rounded-lg h-28"
                      />
                      {editingId === v._id && (
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute p-1 text-red-600 bg-white rounded-full top-1 right-1 hover:text-red-800"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* ✅ Vehicle Details */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {v.brand} {v.model}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        v.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {v.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-700">
                    {[ 
                      { label: 'Year', field: 'modelYear' },
                      { label: 'Owner', field: 'ownerType' },
                      { label: 'Fuel', field: 'fuelType' },
                      { label: 'KMs', field: 'kmDriven' },
                      { label: 'Color', field: 'color' },
                      { label: 'Price', field: 'price' },
                    ].map(({ label, field }) => (
                      <div key={field}>
                        <strong>{label}: </strong>
                        {editingId === v._id ? (
                          <input
                            type={
                              ['modelYear', 'kmDriven', 'price'].includes(field)
                                ? 'number'
                                : 'text'
                            }
                            name={field}
                            value={editedData[field] || ''}
                            onChange={handleChange}
                            className="w-full px-2 py-1 text-sm border rounded"
                          />
                        ) : field === 'price' ? (
                          `₹${new Intl.NumberFormat('en-IN').format(v.price || 0)}`
                        ) : (
                          v[field] || '-'
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ✅ Action Buttons */}
                  <div className="flex justify-end gap-3 mt-4">
                    {editingId === v._id ? (
                      <>
                        <button
                          onClick={() => handleSave(v._id)}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(v)}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(v._id)}
                          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
