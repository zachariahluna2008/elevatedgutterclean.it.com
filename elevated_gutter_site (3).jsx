import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Droplets, Star } from "lucide-react";

export default function ElevatedGutterCleaning() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
    alert("Thank you! We'll get back to you soon.");
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
    setSelectedPackage(null);
    setShowCalendar(false);
    setSelectedDate("");
    setSelectedTime("");
    setPackageForm({ sqft: "", stories: "", name: "", email: "", phone: "", address: "" });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour <= 18; hour++) {
      times.push(`${hour}:00`);
    }
    return times;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Header, Hero, Packages, Package Form (unchanged) */}

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

      {/* About, Contact, Footer (unchanged) */}
    </div>
  );
}
