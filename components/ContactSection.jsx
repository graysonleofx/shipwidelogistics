// React Contact Form Component
import { useState } from 'react';

const ContactSection = () => {

  // useEffect(() =>{
  //   console.log('Publick API URL:', process.env.NEXT_PUBLIC_API_URL)
  // }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Sending...');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: formData.name, email: formData.email, phone: formData.phone, subject: formData.subject, message: formData.message }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus('Message sent successfully');
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-lg mb-4 block">Contact Us</span>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our logistics services? Need a quote? We're here to help you with all your shipping needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a message</h3>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center">
                  <i className="ri-check-circle-line text-green-500 text-xl mr-2"></i>
                  Thank you! Your message has been sent successfully.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    placeholder="Shipping Inquiry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm resize-none"
                  placeholder="Tell us about your shipping requirements..."
                ></textarea>
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.message.length}/500 characters
                </div>
              </div>

              <button type="submit" disabled={loading} className={`w-full p-3 bg-secondary text-white font-semibold rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Sending...' : 'Send Message'} 
              </button>
              {submitStatus && <p className="text-center text-sm text-gray-600 mt-4">{submitStatus}</p>}
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-map-pin-line text-secondary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Our Address</h4>
                  <h4 className="font-semibold text-slate-800 mb-1">Ship wide Logistics LLC</h4>
                  <p className="text-gray-600">10685-B Hazelhurst Dr. Houston, Tx 77043 United State</p>
                </div>
              </div>

              {/* <div className="flex items-start">
                <div className="w-12 h-12  bg-secondary/10  rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-phone-line text-secondary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Phone Number</h4>
                  <p className="text-gray-600">+1 704 000-0000</p>
                </div>
              </div> */}

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-mail-line text-secondary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Email Address</h4>
                  <p className="text-gray-600">contact-us@shipwidelogistics.online</p>
                  {/* <p className="text-gray-600">contactus@pannywiselogistics.online</p> */}
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-time-line text-secondary text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Business Hours</h4>
                  <p className="text-gray-600">24 Hours Delivery</p>
                  {/* <p className="text-gray-600">Sat: 9:00 AM - 4:00 PM</p> */}
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 rounded-lg p-6">
              <h4 className="font-semibold text-secondary mb-4">Emergency Contact</h4>
              <p className="text-gray-800 mb-2">24/7 Support for urgent shipments</p>
              <p className="text-background font-semibold text-lg">contact-us@shipwidelogistics.online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


