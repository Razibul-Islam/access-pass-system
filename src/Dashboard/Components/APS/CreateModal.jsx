import { create } from "ipfs-http-client";
import { XCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";

const ipfs = create({ url: "http://127.0.0.1:5002/api/v0" });

const CreateEventModal = ({ isOpen, onClose, onSubmit }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    startDate: "",
    endDate: "",
    maxPasses: "",
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const {
  //     name,
  //     description,
  //     startDate,
  //     endDate,
  //     price,
  //     duration,
  //     maxPasses,
  //     image,
  //   } = formData;

  //   try {
  //     const contractData = {
  //       price,
  //       duration,
  //       maxPasses,
  //       image,
  //     };
  //     onSubmit(contractData);

  //     await fetch("http://localhost:5000/api/events/create ", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         description,
  //         startDate,
  //         endDate,
  //       }),
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      description,
      startDate,
      endDate,
      price,
      duration,
      maxPasses,
      image,
    } = formData;

    try {
      // Validate required fields
      if (!price || !duration || !maxPasses) {
        alert("Please fill in all required fields");
        return;
      }

      // Validate image - ensure it's not null
      if (image === null || image === undefined) {
        alert("Please select and upload an image");
        return;
      }

      const contractData = {
        price: price.toString(),
        duration: parseInt(duration),
        maxPasses: parseInt(maxPasses),
        image: image, // This should now be a valid IPFS CID string
      };

      console.log("Contract data being sent:", contractData); // Debug log

      await onSubmit(contractData);

      await fetch("http://localhost:5000/api/events/create", {
        // Fixed extra space
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          startDate,
          endDate,
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
                Price (APS)
              </label>
              <input
                type="number"
                name="price"
                value={formData?.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="0.00"
                required
              />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Passes
              </label>
              <input
                type="number"
                name="maxPasses"
                value={formData?.maxPasses}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="1000"
                required
              />
            </div>
          </div>
          {preview && (
            <div>
              <img src={preview} alt="" />
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
                accept="image/png, image/jpeg"
              />
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
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
