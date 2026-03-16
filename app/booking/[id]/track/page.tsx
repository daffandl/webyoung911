'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Phone, CheckCircle, Clock, AlertCircle, Camera } from 'lucide-react';
import { useState } from 'react';

interface ServiceStatus {
  status: 'pending' | 'confirmed' | 'diagnosing' | 'in_progress' | 'qc' | 'done';
  label: string;
  description: string;
  completedAt?: string;
  estimatedAt?: string;
}

interface ServicePhoto {
  id: string;
  type: 'before' | 'after' | 'progress';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface ServiceNote {
  date: string;
  title: string;
  text: string;
}

interface TrackingData {
  orderId: string;
  vehicle: {
    plate: string;
    model: string;
    year: string;
  };
  currentStatus: ServiceStatus;
  timeline: ServiceStatus[];
  photos: ServicePhoto[];
  notes: ServiceNote[];
  estimatedCompletion: string;
  lastUpdated: string;
}

export default function TrackingPage() {
  const params = useParams();
  const orderId = params.id as string;

  // Mock data - in real implementation this would come from API
  const [trackingData] = useState<TrackingData>({
    orderId,
    vehicle: {
      plate: 'B 1234 ABC',
      model: 'Defender 110',
      year: '2020',
    },
    currentStatus: {
      status: 'in_progress',
      label: 'In Progress',
      description: 'Your vehicle is being serviced by our technician',
    },
    timeline: [
      {
        status: 'pending',
        label: 'Booking Created',
        description: 'Your booking was submitted',
        completedAt: '2024-01-15 10:00',
      },
      {
        status: 'confirmed',
        label: 'Confirmed',
        description: 'Your booking has been confirmed by our team',
        completedAt: '2024-01-15 10:30',
      },
      {
        status: 'diagnosing',
        label: 'Diagnosing',
        description: 'Expert inspection and diagnosis in progress',
        completedAt: '2024-01-16 09:00',
      },
      {
        status: 'in_progress',
        label: 'In Progress',
        description: 'Repair and service work underway',
        estimatedAt: '2024-01-17 17:00',
      },
      {
        status: 'qc',
        label: 'Quality Check',
        description: 'Final quality control check',
      },
      {
        status: 'done',
        label: 'Complete',
        description: 'Ready for pickup',
      },
    ],
    photos: [
      {
        id: '1',
        type: 'before',
        url: '🚙',
        uploadedBy: 'Budi (Mechanic)',
        uploadedAt: '2024-01-16 09:30',
      },
      {
        id: '2',
        type: 'progress',
        url: '🔧',
        uploadedBy: 'Budi (Mechanic)',
        uploadedAt: '2024-01-16 14:00',
      },
    ],
    notes: [
      {
        date: '2024-01-16 09:00',
        title: 'Diagnosis Complete',
        text: 'Engine has carbon buildup on intake valves. Oil change needed. Transmission fluid dark - recommend full flush.',
      },
      {
        date: '2024-01-16 14:00',
        title: 'Work Started',
        text: 'Began valve cleaning and oil change. All parts ready, no additional repairs needed.',
      },
    ],
    estimatedCompletion: '2024-01-17 17:00',
    lastUpdated: '2024-01-16 16:00',
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-gray-600',
    confirmed: 'bg-blue-600',
    diagnosing: 'bg-yellow-600',
    in_progress: 'bg-purple-600',
    qc: 'bg-orange-600',
    done: 'bg-green-600',
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle size={24} />;
      case 'in_progress':
        return <Clock size={24} />;
      default:
        return <Clock size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ChevronLeft size={18} />
            Back to Home
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold">Service Tracking</h1>
            <p className="text-gray-400">Order {trackingData.orderId}</p>
          </div>
        </div>

        {/* Vehicle Info Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Your Vehicle</h2>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">{trackingData.vehicle.plate}</p>
              <p className="text-gray-400">
                {trackingData.vehicle.model} • {trackingData.vehicle.year}
              </p>
            </div>
            <div className="text-5xl">🚙</div>
          </div>
        </div>

        {/* Current Status Banner */}
        <div className={`${statusColors[trackingData.currentStatus.status]} bg-opacity-20 border border-opacity-40 border-gray-500 rounded-xl p-6 mb-8`}>
          <div className="flex items-center gap-4">
            <div className={`${statusColors[trackingData.currentStatus.status]} rounded-full p-3`}>
              {getStatusIcon(trackingData.currentStatus.status)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{trackingData.currentStatus.label}</h3>
              <p className="text-gray-300">{trackingData.currentStatus.description}</p>
              {trackingData.currentStatus.estimatedAt && (
                <p className="text-sm text-gray-400 mt-2">
                  ⏱️ Estimated completion: {trackingData.currentStatus.estimatedAt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Service Timeline</h2>

          <div className="relative space-y-6">
            {trackingData.timeline.map((step, idx) => {
              const isCompleted = trackingData.timeline
                .slice(0, idx)
                .every((s) => s.completedAt);
              const isCurrent = step.status === trackingData.currentStatus.status;

              return (
                <div key={step.status} className="relative">
                  {/* Timeline line */}
                  {idx < trackingData.timeline.length - 1 && (
                    <div
                      className={`absolute left-6 top-16 w-1 h-12 ${
                        isCompleted || isCurrent ? 'bg-red-600' : 'bg-gray-700'
                      }`}
                    />
                  )}

                  {/* Timeline item */}
                  <div className="flex gap-6">
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted || isCurrent
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 border border-gray-700 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : isCurrent ? (
                        <Clock size={20} className="animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                      )}
                    </div>

                    <div className="pt-2 pb-6 flex-1">
                      <h3 className="font-semibold text-lg mb-1">{step.label}</h3>
                      <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                      {step.completedAt && (
                        <p className="text-xs text-gray-500">✓ {step.completedAt}</p>
                      )}
                      {step.estimatedAt && !step.completedAt && (
                        <p className="text-xs text-orange-500">⏱️ Expected: {step.estimatedAt}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Notes */}
        {trackingData.notes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Service Notes</h2>
            <div className="space-y-4">
              {trackingData.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    <span className="text-xs text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos */}
        {trackingData.photos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Camera size={24} />
              Vehicle Photos
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {trackingData.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-800 flex items-center justify-center text-6xl border-b border-gray-800">
                    {photo.url}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full capitalize">
                        {photo.type === 'before'
                          ? 'Before'
                          : photo.type === 'after'
                          ? 'After'
                          : 'Progress'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{photo.uploadedBy}</p>
                    <p className="text-xs text-gray-500">{photo.uploadedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Boxes */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">Last Updated</h3>
                <p className="text-sm text-blue-200">{trackingData.lastUpdated}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-300 mb-1">Estimated Completion</h3>
                <p className="text-sm text-green-200">{trackingData.estimatedCompletion}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Need to discuss your service?</h3>
          <p className="text-gray-400">
            Reach out to our team via WhatsApp for immediate assistance
          </p>
          <a
            href="https://wa.me/628123456789?text=Hi%20Young%20911%20Autowerks%2C%20I%27m%20tracking%20order%20ID%3A%20{orderId}"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            <Phone size={18} />
            Message on WhatsApp
          </a>
          <p className="text-sm text-gray-500">
            Include your order ID: <span className="font-mono text-gray-400">{orderId}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
