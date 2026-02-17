// src/components/layout/Footer.tsx
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const footerLinks = {
  destinations: [
    { label: "Rajasthan", href: "/explore?state=Rajasthan" },
    { label: "Gujarat", href: "/explore?state=Gujarat" },
    { label: "Maharashtra", href: "/explore?state=Maharashtra" },
    { label: "Goa", href: "/explore?state=Goa" },
  ],
  categories: [
    { label: "Heritage Sites", href: "/explore?category=heritage" },
    { label: "Eco Tourism", href: "/explore?category=eco-tourism" },
    { label: "Adventure", href: "/explore?category=adventure" },
    { label: "Food & Culture", href: "/explore?category=food" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">प</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">Paschim Bharat</h3>
                <p className="text-sm text-gray-400">Discover Western India</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your gateway to experiencing the rich cultural heritage, breathtaking
              landscapes, and culinary delights of Western India.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              Destinations
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-saffron-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-saffron-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-saffron-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Tourism Office, Mumbai,<br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-saffron-500" />
                <span className="text-gray-400">+91 1800 XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-saffron-500" />
                <span className="text-gray-400">info@paschimbharat.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Paschim Bharat. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for
              IndiaSkills 2025-26
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}