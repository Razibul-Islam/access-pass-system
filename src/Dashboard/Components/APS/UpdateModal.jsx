import { useCallback, useEffect, useState } from "react";
import { useAccessPassSystem } from "../../../hooks/useAccessPassSystem";
import { XCircle } from "lucide-react";
import { UseEvents } from "../../../hooks/backend";
import Loading from "../../../Components/Loading";

export default function UpdateModal({ isOpen, onClose, onSubmit, eventId }) {
  const { getEventDetails, loading } = useAccessPassSystem();
  const { fetchEventById } = UseEvents();
  const [eventData, setEventData] = useState(null);
  const [eventBData, setEventBData] = useState(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",

    // Tier 1 fields
    tier1Price: "",
    tier1MaxPasses: "",

    // Tier 2 fields
    tier2Price: "",
    tier2MaxPasses: "",

    // Tier 3 fields
    tier3Price: "",
    tier3MaxPasses: "",
    duration: 0,
  });

  //   console.log(eventId._id);

  const handleBevent = useCallback(
    async (_id) => {
      const res = await fetchEventById(_id);
      setEventBData(res);
    },
    [fetchEventById]
  );

  const handleEventsDetails = useCallback(
    async (id) => {
      const res = await getEventDetails(id);
      setEventData(res);
    },
    [getEventDetails]
  );

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prev) => {
      const update = { ...prev, [name]: value };

      const startDate = update.startDate || eventBData?.startDate;
      const endDate = update.endDate || eventBData?.endDate;
      console.log(startDate, endDate);
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dif = end - start;

        update.duration = dif >= 0 ? Math.floor(dif / 1000) : 0;
      }

      return update;
    });
  };

  useEffect(() => {
    if (eventId._id && eventId.id) {
      handleBevent(eventId._id);
      handleEventsDetails(eventId.id);
    }
  }, [eventId.id, eventId._id, handleBevent, handleEventsDetails]);

  useEffect(() => {
    if (eventData) {
      setFormData((prev) => ({
        ...prev,
        duration: eventData.duration,
      }));
    }
  }, [eventData]);

  console.log(eventBData);
  console.log(eventData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      startDate,
      endDate,
      tier1Price,
      tier1MaxPasses,
      tier2Price,
      tier2MaxPasses,
      tier3Price,
      tier3MaxPasses,
      duration,
    } = formData;

    const contractData = {
      eventId: eventId.id,
      _price: [
        tier1Price || eventData?.priceFormatted[0],
        tier2Price || eventData?.priceFormatted[1],
        tier3Price || eventData?.priceFormatted[2],
      ],
      _duration: duration,
      _maxpasses: [
        tier1MaxPasses || eventData?.maxPasses[0],
        tier2MaxPasses || eventData?.maxPasses[1],
        tier3MaxPasses || eventData?.maxPasses[2],
      ],
    };
    await onSubmit(contractData);

    await fetch(`http://localhost:5000/api/events/update/${eventId._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: eventBData.category,
        description: eventBData.description,
        startDate: startDate || eventBData.startDate,
        endDate: endDate || eventBData.endDate,
        sold: eventBData.sold,
      }),
    });
  };

  if (loading) {
    return <Loading />;
  }

  console.log(eventBData);
  console.log(eventData);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Update Event</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={eventData?.name}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={eventBData?.category}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
              >
                <option value="">Select category</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="concert">Concert</option>
                <option value="sports">Sports</option>
                <option value="exhibition">Exhibition</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              defaultValue={eventBData?.description}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={eventBData?.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                defaultValue={eventBData?.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Price Tiers Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pass Tiers
            </h3>

            {/* Tier 1 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-700 mb-3">Tier 1 Pass</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pass Name
                  </label>
                  <input
                    type="text"
                    name="tier1Name"
                    defaultValue={eventData?.passTypeNames[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="e.g., Early Bird"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (APS)
                  </label>
                  <input
                    type="number"
                    name="tier1Price"
                    defaultValue={eventData?.priceFormatted[0]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Passes
                  </label>
                  <input
                    type="number"
                    name="tier1MaxPasses"
                    defaultValue={eventData?.maxPasses[0]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-700 mb-3">Tier 2 Pass</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pass Name
                  </label>
                  <input
                    type="text"
                    name="tier2Name"
                    defaultValue={eventData?.passTypeNames[1]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="e.g., Regular"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (APS)
                  </label>
                  <input
                    type="number"
                    name="tier2Price"
                    defaultValue={eventData?.priceFormatted[1]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Passes
                  </label>
                  <input
                    type="number"
                    name="tier2MaxPasses"
                    defaultValue={eventData?.maxPasses[1]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="500"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-700 mb-3">Tier 3 Pass</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pass Name
                  </label>
                  <input
                    type="text"
                    name="tier3Name"
                    defaultValue={eventData?.passTypeNames[2]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="e.g., VIP"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (APS)
                  </label>
                  <input
                    type="number"
                    name="tier3Price"
                    defaultValue={eventData?.priceFormatted[2]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Passes
                  </label>
                  <input
                    type="number"
                    name="tier3MaxPasses"
                    defaultValue={eventData?.maxPasses[2]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="50"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}

          <div className="flex justify-center">
            <div className="relative">
              <img
                src={`https://ipfs.io/ipfs/${eventData?.ipfsHash}`}
                alt="Event preview"
                className="max-w-md max-h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
