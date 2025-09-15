// Create a professional top header bar for a logistics company using Tailwind CSS
// Include left-aligned company email and phone number
// Include right-aligned business hours with a clock icon
// Make it responsive: stack on small screens, flex on medium and above
// Use a dark background with subtle text color
// Make it look clean, modern, and corporate
export default function TopHeader() {
  return (
    <div className="bg-primary sticky top-0 z-50 text-gray-300 py-4 px-4 md:px-12">
      <div className="container mx-auto flex flex-row md:flex-cpl justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row  justify-between">
          <span className="mr-0 md:mr-4 text-sm md:text-lg">Email: contact-us@shipwidelogistics.com</span>
          {/* <span className="text-sm md:text-lg">Phone: +1 223-456-7890</span> */}
        </div>
        <div className="flex flex-col md:flex-row  justify-between">
          <span className="text-sm md:text-lg">Business Hours: 24/7</span>
        </div>
      </div>
    </div>
  );
}