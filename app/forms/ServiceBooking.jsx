'use client';
import { useState } from 'react';

export default function ServiceBooking({ open, setOpen, service }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // mock submit - replace with real API call
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
    // keep modal open to show success; close after short delay
    setTimeout(() => {
      setSuccess(false);
      setOpen(false);
      setForm({ name: '', phone: '', email: '', date: '', time: '', notes: '' });
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto p-6 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Book: {service.title}
            </h3>
            <p className="text-sm text-gray-600">{service.subtitle}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black col-span-2"
            />
            <input
              required
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex gap-3">
            <select
              required
              name="time"
              value={form.time}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-1/2"
            >
              <option value="">Select time</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>01:00 PM</option>
              <option>03:00 PM</option>
            </select>

            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500">Estimated</div>
              <div className="font-semibold text-gray-900">{service.price}</div>
            </div>
          </div>

          <textarea
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
            placeholder="Anything we should know? (optional)"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
          />

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium shadow disabled:opacity-60"
            >
              {loading ? 'Booking...' : success ? 'Booked ✓' : 'Confirm Booking'}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
