// function Footer() {
//   return (
//     <footer className="bg-gray-100 text-center p-4 mt-8">
//       <p className="text-sm text-gray-600">
//         &copy; 2025 Access Pass System. All rights reserved.
//       </p>
//     </footer>
//   );
// }

// export default Footer;
import React from "react";
import {
  Shield,
  Github,
  Twitter,
  Globe,
  Mail,
  ExternalLink,
  Heart,
  Zap,
  Lock,
  Users,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "My Passes", href: "/passes" },
    { label: "Treasury", href: "/treasury" },
    { label: "Admin", href: "/admin" },
  ];

  const resources = [
    {
      label: "Documentation",
      href: "/docs",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      label: "API Reference",
      href: "/api",
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      label: "Smart Contracts",
      href: "/contracts",
      icon: <Lock className="w-4 h-4" />,
    },
    {
      label: "Community",
      href: "/community",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  const socialLinks = [
    { label: "GitHub", href: "#", icon: <Github className="w-5 h-5" /> },
    { label: "Twitter", href: "#", icon: <Twitter className="w-5 h-5" /> },
    { label: "Discord", href: "#", icon: <Users className="w-5 h-5" /> },
  ];

  const technologies = [
    "Solidity",
    "Ethers.js",
    "React.js",
    "Tailwind CSS",
    "IPFS",
    "Ethereum",
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900 border-t border-purple-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  APS
                </h3>
                <p className="text-xs text-gray-400">Access Pass System</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Decentralized event passes and content access powered by
              blockchain technology. Secure, transparent, and truly owned by
              you.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <span className="text-gray-400 group-hover:text-purple-300 transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 text-purple-400 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Globe className="w-5 h-5 text-blue-400 mr-2" />
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-400 hover:text-blue-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="text-blue-400 mr-3 group-hover:scale-110 transition-transform">
                      {resource.icon}
                    </span>
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Mail className="w-5 h-5 text-emerald-400 mr-2" />
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest updates on new features and events.
            </p>

            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105">
                  <Mail className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>We respect your privacy. No spam, ever.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="text-center text-lg font-semibold text-white mb-6">
            Powered By
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>
                © {currentYear} Access Pass System. All rights reserved.
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/security"
                className="text-gray-400 hover:text-purple-300 transition-colors"
              >
                Security
              </a>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 mx-1 animate-pulse" />
              <span>Razibul Islam for Web3</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
