'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';

type BookingStep = 1 | 2 | 3 | 4;

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  year: string;
  color?: string;
}

interface BookingFormData {
  vehicle: Vehicle | null;
  complaint: string;
  symptoms: string[];
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
}

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>(1);
  const [isCreatingVehicle, setIsCreatingVehicle] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    vehicle: null,
    complaint: '',
    symptoms: [],
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
  });

  const [savedVehicles] = useState<Vehicle[]>([
    { id: '1', plate: 'B 1234 ABC', model: 'Defender 110', year: '2020', color: 'Black' },
    { id: '2', plate: 'B 5678 XYZ', model: 'Discovery 5', year: '2022', color: 'White' },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    plate: '',
    model: 'Defender',
    year: new Date().getFullYear().toString(),
    color: '',
  });

  const commonSymptoms = [
    'Engine troubles',
    'Brake issues',
    'Steering problems',
    'Suspension noise',
    'Electrical issues',
    'Transmission problems',
    'Cooling system',
    'Fuel efficiency',
  ];

  const landRoverModels = [
    'Defender',
    'Discovery',
    'Discovery Sport',
    'Range Rover',
    'Range Rover Sport',
    'Range Rover Velar',
    'Freelander',
  ];

  const handleAddVehicle = () => {
    if (!newVehicle.plate || !newVehicle.model || !newVehicle.year) {
      alert('Please fill in all vehicle details');
      return;
    }

    const vehicle: Vehicle = {
      id: Date.now().toString(),
      plate: newVehicle.plate.toUpperCase(),
      model: newVehicle.model,
      year: newVehicle.year,
      color: newVehicle.color,
    };

    setFormData({ ...formData, vehicle });
    setIsCreatingVehicle(false);
    setNewVehicle({
      plate: '',
      model: 'Defender',
      year: new Date().getFullYear().toString(),
      color: '',
    });
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setFormData({ ...formData, vehicle });
  };

  const handleSymptomChange = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = () => {
    // Simulate API call and generate order ID
    const generatedOrderId = `Y911-${Date.now().toString().slice(-8).toUpperCase()}`;
    setOrderId(generatedOrderId);

    // Log form data
    console.log('Booking submitted:', {
      ...formData,
      orderId: generatedOrderId,
    });
  };

  const isStep1Valid = formData.vehicle !== null;
  const isStep2Valid = formData.complaint.trim().length > 0 && formData.name.trim().length > 0 && formData.phone.trim().length > 0;
  const isStep3Valid = formData.date && formData.time;

  if (orderId) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-600 flex items-center justify-center">
                <Check size={48} className="text-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold">Booking Confirmed!</h1>
              <p className="text-gray-400">
                Your service order has been received. You will receive a confirmation via WhatsApp shortly.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4 text-left">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Order Number</p>
                <div className="flex items-center gap-3 bg-gray-900 rounded-lg p-4">
                  <span className="text-2xl font-bold text-red-500">{orderId}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(orderId);
                      alert('Order ID copied to clipboard');
                    }}
                    className="ml-auto p-2 hover:bg-gray-800 rounded-lg transition"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-gray-700">
                <div>
                  <p className="text-sm text-gray-400">Vehicle</p>
                  <p className="font-semibold">{formData.vehicle?.plate} - {formData.vehicle?.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Scheduled Date</p>
                  <p className="font-semibold">
                    {new Date(formData.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {formData.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <Link
                href={`/booking/${orderId}/track`}
                className="block w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition text-center"
              >
                Track Service Status
              </Link>
              <Link
                href="/"
                className="block w-full px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg transition text-center"
              >
                Back to Home
              </Link>
            </div>

            <div className="text-sm text-gray-400 space-y-2">
              <p>💬 You can also track your order on WhatsApp</p>
              <p>📞 Need help? Contact us: <a href="https://wa.me/628123456789" className="text-red-500 hover:text-red-400">WhatsApp Support</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ChevronLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Book Your Service</h1>
          <p className="text-gray-400 text-lg">
            Step {step} of 4 - {
              step === 1 ? 'Select Vehicle' :
              step === 2 ? 'Describe Your Issue' :
              step === 3 ? 'Choose Date & Time' :
              'Confirm Booking'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-red-600' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-8">
          {/* Step 1: Select Vehicle */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Select Your Vehicle</h2>

                {!isCreatingVehicle ? (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {savedVehicles.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          onClick={() => handleSelectVehicle(vehicle)}
                          className={`w-full p-4 rounded-lg border-2 transition text-left ${
                            formData.vehicle?.id === vehicle.id
                              ? 'border-red-600 bg-red-600/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-lg">{vehicle.plate}</p>
                              <p className="text-sm text-gray-400">
                                {vehicle.model} • {vehicle.year}
                              </p>
                            </div>
                            {formData.vehicle?.id === vehicle.id && (
                              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                                <Check size={16} className="text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsCreatingVehicle(true)}
                      className="w-full p-4 rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 transition text-gray-400 hover:text-white font-medium"
                    >
                      + Add New Vehicle
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Add New Vehicle</h3>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">License Plate *</label>
                      <input
                        type="text"
                        placeholder="e.g., B 1234 ABC"
                        value={newVehicle.plate}
                        onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Model *</label>
                      <select
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      >
                        {landRoverModels.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Year *</label>
                      <input
                        type="number"
                        min="1990"
                        max={new Date().getFullYear()}
                        value={newVehicle.year}
                        onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Color (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g., Black"
                        value={newVehicle.color}
                        onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => {
                          setIsCreatingVehicle(false);
                          setNewVehicle({
                            plate: '',
                            model: 'Defender',
                            year: new Date().getFullYear().toString(),
                            color: '',
                          });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddVehicle}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                      >
                        Save Vehicle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Complaint & Contact Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Describe Your Issue</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Main Complaint *</label>
                    <textarea
                      value={formData.complaint}
                      onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                      placeholder="e.g., Engine not starting, weird noise from engine, brake vibration..."
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-600 h-32 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-3">Common Symptoms (Optional)</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {commonSymptoms.map((symptom) => (
                        <label key={symptom} className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition">
                          <input
                            type="checkbox"
                            checked={formData.symptoms.includes(symptom)}
                            onChange={() => handleSymptomChange(symptom)}
                            className="w-4 h-4 rounded bg-gray-800 border-gray-600 cursor-pointer"
                          />
                          <span className="text-sm">{symptom}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6 space-y-4">
                    <h3 className="font-semibold">Your Contact Information</h3>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08xx xxxx xxxx"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Schedule Your Service</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We typically service on weekdays (Monday - Saturday)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Preferred Time *</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="">Select time slot</option>
                      {['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                        <option key={time} value={time}>
                          {time} WIB
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-300">
                      ℹ️ Our workshop is open Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 4:00 PM, Closed Sunday
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>

                <div className="space-y-4 bg-gray-800/50 p-6 rounded-lg">
                  <div className="pb-4 border-b border-gray-700">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Vehicle</p>
                    <p className="text-lg font-semibold">{formData.vehicle?.plate}</p>
                    <p className="text-sm text-gray-400">
                      {formData.vehicle?.model} • {formData.vehicle?.year}
                    </p>
                  </div>

                  <div className="pb-4 border-b border-gray-700">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Complaint</p>
                    <p className="text-sm leading-relaxed">{formData.complaint}</p>
                    {formData.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.symptoms.map((symptom) => (
                          <span
                            key={symptom}
                            className="inline-block px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pb-4 border-b border-gray-700">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Scheduled Date & Time</p>
                    <p className="text-lg font-semibold">
                      {new Date(formData.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-400">{formData.time} WIB</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Contact Information</p>
                    <p className="text-sm"><span className="text-gray-400">Name:</span> {formData.name}</p>
                    <p className="text-sm"><span className="text-gray-400">Phone:</span> {formData.phone}</p>
                    {formData.email && (
                      <p className="text-sm"><span className="text-gray-400">Email:</span> {formData.email}</p>
                    )}
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 mt-6">
                  <p className="text-sm text-green-300">
                    ✓ You will receive a confirmation message via WhatsApp after submitting this booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={() => setStep((Math.max(1, step - 1) as BookingStep))}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                step === 1
                  ? 'opacity-50 cursor-not-allowed border border-gray-700'
                  : 'border border-gray-600 hover:border-gray-400 text-white'
              }`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <button
              onClick={() => {
                if (step === 4) {
                  handleSubmit();
                } else {
                  setStep((Math.min(4, step + 1) as BookingStep));
                }
              }}
              disabled={
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid) ||
                (step === 3 && !isStep3Valid)
              }
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                (step === 1 && !isStep1Valid) ||
                (step === 2 && !isStep2Valid) ||
                (step === 3 && !isStep3Valid)
                  ? 'opacity-50 cursor-not-allowed bg-gray-700'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {step === 4 ? (
                <>
                  Complete Booking
                  <Check size={18} />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
