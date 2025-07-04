import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { XCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";

const ipfs = create({ url: "http://127.0.0.1:5002/api/v0" });

const CreateEventModal = ({ isOpen, onClose, onSubmit }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",

    // Tier 1 fields
    tier1Name: "",
    tier1Price: "",
    tier1MaxPasses: "",

    // Tier 2 fields
    tier2Name: "",
    tier2Price: "",
    tier2MaxPasses: "",

    // Tier 3 fields
    tier3Name: "",
    tier3Price: "",
    tier3MaxPasses: "",

    image: null,
    duration: 0,
  });

  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Preview Showing
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload on IPFS local Desktop
      const added = await ipfs.add(file);
      const cid = added.cid.toString();
      console.log(cid);
      setFormData((prev) => ({
        ...prev,
        image: cid,
      }));
    } catch (err) {
      console.error("Error during adding image on IPFS: ", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (updated.startDate && updated.endDate) {
        const start = new Date(updated.startDate);
        const end = new Date(updated.endDate);
        const dif = end - start;

        if (dif >= 0) {
          const difS = Math.floor(dif / 1000);
          updated.duration = difS;
        } else {
          updated.duration = 0;
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      category,
      description,
      startDate,
      endDate,

      // Tier 1 fields
      tier1Name,
      tier1Price,
      tier1MaxPasses,

      // Tier 2 fields
      tier2Name,
      tier2Price,
      tier2MaxPasses,

      // Tier 3 fields
      tier3Name,
      tier3Price,
      tier3MaxPasses,

      image,
      duration,
    } = formData;

    try {
      // Validate required fields
      if (
        !name ||
        !tier1Price ||
        !duration ||
        !tier1MaxPasses ||
        !tier2MaxPasses ||
        !tier2Price ||
        !tier3Price ||
        !tier3MaxPasses
      ) {
        alert("Please fill in all required fields");
        return;
      }

      // Validate image - ensure it's not null
      if (image === null || image === undefined) {
        alert("Please select and upload an image");
        return;
      }

      const contractData = {
        eventName: name,
        _price: [
          ethers.parseEther(tier1Price.toString()),
          ethers.parseEther(tier2Price.toString()),
          ethers.parseEther(tier3Price.toString()),
        ],
        duration: parseInt(duration),
        _maxpass: [
          parseInt(tier1MaxPasses),
          parseInt(tier2MaxPasses),
          parseInt(tier3MaxPasses),
        ],
        ipfsHash: image, // This should now be a valid IPFS CID string
        passTypeNames: [tier1Name, tier2Name, tier3Name],
      };

      await onSubmit(contractData);

      await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category,
          description,
          startDate,
          endDate,
          sold: 0,
        }),
      });
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Create New Event
            </h3>
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
                value={formData?.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter event name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData?.category}
                onChange={handleInputChange}
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
              value={formData?.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter event description"
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
                value={formData?.startDate}
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
                value={formData?.endDate}
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
                    value={formData?.tier1Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="e.g., Early Bird"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (APS)
                  </label>
                  <input
                    type="number"
                    name="tier1Price"
                    value={formData?.tier1Price}
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
                    value={formData?.tier1MaxPasses}
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
                    value={formData?.tier2Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="e.g., Regular"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (APS)
                  </label>
                  <input
                    type="number"
                    name="tier2Price"
                    value={formData?.tier2Price}
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
                    value={formData?.tier2MaxPasses}
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
                    value={formData?.tier3Name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="e.g., VIP"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (APS)
                  </label>
                  <input
                    type="number"
                    name="tier3Price"
                    value={formData?.tier3Price}
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
                    value={formData?.tier3MaxPasses}
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
          {preview && (
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={preview}
                  alt="Event preview"
                  className="max-w-md max-h-64 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, image: null }));
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image
            </label>
            <div
              onClick={handleClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                hidden
                accept="image/png, image/jpeg, image/jpg, image/webp"
              />
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, WEBP up to 10MB
              </p>
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
};

export default CreateEventModal;
