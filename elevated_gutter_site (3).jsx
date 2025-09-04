import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Droplets, Star } from "lucide-react";

export default function ElevatedGutterCleaning() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageForm, setPackageForm] = useState({ sqft: "", stories: "", name: "", email: "", phone: "", address: "" });
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! We received your request.\n\nDetails:\nEmail: ${form.email}\nPhone: ${form.phone}\nAddress: ${form.address}\nMessage: ${form.message}`);
    window.location.href = `mailto:zachariahluna2008@gmail.com?subject=New Quote Request from ${form.name}&body=Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0APhone: ${form.phone}%0D%0AAddress: ${form.address}%0D%0AMessage: ${form.message}`;
    setForm({ name: "", email: "", phone: "", address: "", message: "" });
  };

  const handlePackageChange = (e) => {
    setPackageForm({ ...packageForm, [e.target.name]: e.target.value });
  };

  const handlePackageSubmit = (e) => {
    e.preventDefault();
    setShowCalendar(true);
  };

  const handleCalendarSubmit = (e) => {
    e.preventDefault();
    const bookingKey = `${selectedDate}-${selectedTime}`;
    if (bookings.includes(bookingKey)) {
      alert("Sorry, that time slot is already booked. Please choose another.");
      return;
    }
    setBookings([...bookings, bookingKey]);
    alert(`Thank you for booking the ${selectedPackage} on ${selectedDate} at ${selectedTime}!`);

    window.location.href = `mailto:zachariahluna2008@gmail.com?subject=New Booking for ${selectedPackage}&body=Package: ${selectedPackage}%0D%0AName: ${packageForm.name}%0D%0AEmail: ${packageForm.email}%0D%0APhone: ${packageForm.phone}%0D%0AAddress: ${packageForm.address}%0D%0ASquare Feet: ${packageForm.sqft}%0D%0AStories: ${packageForm.stories}%0D%0ADate: ${selectedDate}%0D%0ATime: ${selectedTime}`;

    setSelectedPackage(null);
    setShowCalendar(false);
    setSelectedDate("");
    setSelectedTime("");
    setPackageForm({ sqft: "", stories: "", name: "", email: "", phone: "", address: "" });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour <= 18; hour++) {
      const ampm = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      times.push(`${displayHour}:00 ${ampm}`);
    }
    return times;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Elevated Gutter Cleaning</h1>
          <nav className="space-x-6 font-medium">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {!selectedPackage && !showCalendar && (
        <section className="text-center py-20 bg-blue-600 text-white">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-extrabold mb-4">
            Keep Your Gutters Flowing
          </motion.h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Professional, affordable, and reliable gutter cleaning services to protect your home.
          </p>
          <Button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100">
            Get a Free Quote
          </Button>
        </section>
      )}

      {/* Packages Section */}
      {!selectedPackage && !showCalendar && (
        <section id="services" className="py-16 max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Our Service Packages</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <Card onClick={() => setSelectedPackage("Basic Package")} className="shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <Droplets className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Basic Package</h4>
                <p>Essential gutter cleaning to remove leaves, dirt, and light debris. Perfect for routine maintenance.</p>
              </CardContent>
            </Card>

            {/* Full Throttle Package (Best Deal) */}
            <Card onClick={() => setSelectedPackage("Full Throttle Package")} className="shadow-lg rounded-2xl relative border-2 border-blue-600 cursor-pointer hover:shadow-xl transition">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-4 h-4" /> Best Deal
              </div>
              <CardContent className="p-6 text-center">
                <Droplets className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Full Throttle Package</h4>
                <p>Complete cleaning, downspout clearing, and full inspection. The ultimate protection for your home.</p>
              </CardContent>
            </Card>

            {/* Wash & Clean Package */}
            <Card onClick={() => setSelectedPackage("Wash & Clean Package")} className="shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <Droplets className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Wash & Clean Package</h4>
                <p>Includes exterior gutter wash and detailed cleaning to restore your gutters’ fresh look.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Package Form Screen */}
      {selectedPackage && !showCalendar && (
        <section className="py-16 max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">{selectedPackage} - Sign Up</h3>
          <form onSubmit={handlePackageSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <div>
              <label className="block font-semibold mb-2">House Square Feet</label>
              <input type="number" name="sqft" value={packageForm.sqft} onChange={handlePackageChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Number of Stories</label>
              <input type="number" name="stories" value={packageForm.stories} onChange={handlePackageChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input type="text" name="name" value={packageForm.name} onChange={handlePackageChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input type="email" name="email" value={packageForm.email} onChange={handlePackageChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <input type="tel" name="phone" value={packageForm.phone} onChange={handlePackageChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Address</label>
              <input type="text" name="address" value={packageForm.address} onChange={handlePackageChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div className="flex justify-between">
              <Button type="button" onClick={() => setSelectedPackage(null)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-400">
                Back
              </Button>
              <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700">
                Next
              </Button>
            </div>
          </form>
        </section>
      )}

      {/* Calendar Booking Screen */}
      {showCalendar && (
        <section className="py-16 max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Select Date & Time</h3>
          <form onSubmit={handleCalendarSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <div>
              <label className="block font-semibold mb-2">Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Time</label>
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required className="w-full border rounded-xl px-4 py-2">
                <option value="">Select a time</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time} disabled={bookings.includes(`${selectedDate}-${time}`)}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <Button type="button" onClick={() => setShowCalendar(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-400">
                Back
              </Button>
              <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700">
                Confirm Booking
              </Button>
            </div>
          </form>
        </section>
      )}

      {/* About Section */}
      {!selectedPackage && !showCalendar && (
        <section id="about" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h3 className="text-3xl font-bold mb-6">Why Choose Us?</h3>
            <p className="text-lg leading-relaxed">
              At Elevated Gutter Cleaning, we pride ourselves on professionalism, safety, and attention to detail. Our goal is to keep your home safe from water damage by providing affordable and effective gutter care.
            </p>
          </div>
        </section>
      )}

      {/* Contact Form */}
      {!selectedPackage && !showCalendar && (
        <section id="contact" className="py-16 max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Contact Us</h3>
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Phone</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Address</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2" rows="4"></textarea>
            </div>
            <Button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700">
              Send Message
            </Button>
          </form>

          {/* Contact Info */}
          <div className="text-center mt-12 space-y-4">
            <p className="flex justify-center items-center gap-2"><Phone className="w-5 h-5 text-blue-600" /> (209) 445-6563</p>
            <p className="flex justify-center items-center gap-2"><Mail className="w-5 h-5 text-blue-600" /> info@elevatedgutters.com</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 text-center mt-12">
        <p>&copy; {new Date().getFullYear()} Elevated Gutter Cleaning. All rights reserved.</p>
      </footer>
    </div>
  );
}
