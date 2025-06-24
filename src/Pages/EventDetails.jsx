import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Ticket,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAccessPassSystem } from "../hooks/useAccessPassSystem";
import { UseEvents } from "../hooks/backend";
import Loading from "../Components/Loading";

export default function EventDetails() {
  const { _id, id } = useParams();
  const [hoveredPass, setHoveredPass] = useState(null);
  const [Event, setEvent] = useState({});
  const [bevent, setBevent] = useState({});
  const { fetchEventById } = UseEvents();

  const { getEventDetails, loading, purchaseEventPass } = useAccessPassSystem();

  const handleEventsDetails = async (eventId) => {
    const res = await getEventDetails(eventId);
    setEvent(res);
  };

  const handlePurchaseEventPass = async (eventId) => {
    await purchaseEventPass(eventId);
  };

  const handleBevent = async (beventId) => {
    const res = await fetchEventById(beventId);
    setBevent(res);
  };

  useEffect(() => {
    if (_id && id && getEventDetails) {
      handleEventsDetails(id);
      handleBevent(_id);
    }
  }, [id, getEventDetails, _id]);

  const event = { ...Event, ...bevent };

  const passes = [
    {
      id: "bronze",
      type: "Bronze Pass",
      price: "299 APS",
      originalPrice: "399 APS",
      color: "from-amber-600 to-orange-600",
      borderColor: "border-amber-500/50",
      available: 250,
      total: 300,
      features: [
        "Access to main conference sessions",
        "Digital event materials",
        "Basic networking opportunities",
        "Live streaming access",
        "Community Discord access",
      ],
      badge: "Most Popular",
    },
    {
      id: "silver",
      type: "Silver Pass",
      price: "599 APS",
      originalPrice: "799 APS",
      color: "from-gray-400 to-gray-600",
      borderColor: "border-gray-400/50",
      available: 80,
      total: 150,
      features: [
        "All Bronze Pass benefits",
        "VIP seating at keynotes",
        "Exclusive workshop access",
        "Meet & greet with speakers",
        "Premium networking events",
        "Event swag bag",
        "Certificate of participation",
      ],
      badge: "Best Value",
    },
    {
      id: "golden",
      type: "Golden Pass",
      price: "1,299 APS",
      originalPrice: "1,599 APS",
      color: "from-yellow-400 to-yellow-600",
      borderColor: "border-yellow-400/50",
      available: 15,
      total: 50,
      features: [
        "All Silver Pass benefits",
        "Private dinner with speakers",
        "One-on-one mentorship session",
        "Exclusive golden lounge access",
        "Priority Q&A opportunities",
        "Premium swag & memorabilia",
        "Lifetime community access",
        "Recording of all sessions",
      ],
      badge: "Exclusive",
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950">
      <div className="bg-black/20 backdrop-blur-sm sticky top-24 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/events"
              className="flex items-center text-white hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
            <button className="flex items-center text-white hover:text-purple-400 transition-colors">
              <Share2 className="w-5 h-5 mr-2" />
              Share Event
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={`https://ipfs.io/ipfs/${event.ipfsHash}`}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">{event.name}</h1>
            <div className="flex flex-wrap gap-6 text-gray-200">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                {new Date(event.startDate).toLocaleDateString()} -{" "}
                {new Date(event.endDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                {event.duration / 86400} days
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-yellow-400" />
                Up to {event.maxPasses} attendees
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                About This Event
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {event.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">
                Event Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">
                    {event.duration / 86400} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Attendees</span>
                  <span className="text-white">{event.maxPasses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Starting Price</span>
                  <span className="text-white">{event.priceFormatted} APS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Pass
            </h2>
            <p className="text-xl text-gray-300">
              Select the perfect access level for your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {passes.map((pass) => (
              <div
                key={pass.id}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 cursor-pointer ${"border-white/10 hover:border-white/20"} ${
                  hoveredPass === pass.id ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredPass(pass.id)}
                onMouseLeave={() => setHoveredPass(null)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${pass.color} opacity-10 rounded-2xl`}
                ></div>

                <div
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${pass.color} text-white px-4 py-1 rounded-full text-sm font-semibold`}
                >
                  {pass.badge}
                </div>

                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {pass.type}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        {pass.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {pass.originalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      {pass.available}/{pass.total} available
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {pass.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Availability</span>
                      <span>
                        {(
                          ((pass.total - pass.available) / pass.total) *
                          100
                        ).toFixed(0)}
                        % sold
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${pass.color}`}
                        style={{
                          width: `${
                            ((pass.total - pass.available) / pass.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${pass.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center 
                    `}
                    onClick={() => handlePurchaseEventPass(id)}
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Select Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
