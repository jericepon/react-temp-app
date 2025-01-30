import DashboardCard from "./DashboardCard";

const DashboardBookings = () => {
  const bookings = [
    {
      id: 1,
      status: "arriving",
      user: {
        name: "John Doe",
        country: "USA",
        flag: "https://example.com/flags/usa.png",
      },
      nights: 3,
      checkIn: true,
    },
    {
      id: 2,
      status: "departing",
      user: {
        name: "Jane Smith",
        country: "Canada",
        flag: "https://example.com/flags/canada.png",
      },
      nights: 2,
      checkIn: true,
    },
    {
      id: 3,
      status: "arriving",
      user: {
        name: "Alice Johnson",
        country: "UK",
        flag: "https://example.com/flags/uk.png",
      },
      nights: 5,
      checkIn: false,
    },
    {
      id: 4,
      status: "arriving",
      user: {
        name: "Bob Brown",
        country: "Australia",
        flag: "https://example.com/flags/australia.png",
      },
      nights: 4,
      checkIn: true,
    },
    {
      id: 5,
      status: "departing",
      user: {
        name: "Charlie Davis",
        country: "Germany",
        flag: "https://example.com/flags/germany.png",
      },
      nights: 1,
      checkIn: false,
    },
    {
      id: 5,
      status: "departing",
      user: {
        name: "Charlie Davis",
        country: "Germany",
        flag: "https://example.com/flags/germany.png",
      },
      nights: 1,
      checkIn: false,
    },
    {
      id: 5,
      status: "departing",
      user: {
        name: "Charlie Davis",
        country: "Germany",
        flag: "https://example.com/flags/germany.png",
      },
      nights: 1,
      checkIn: false,
    },
  ];
  return (
    <>
      <DashboardCard title="Dashboard" className="h-full">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex gap-4 p-3 px-0 border-b last:border-b-0 justify-between"
          >
            <div
              className={[
                "flex uppercase rounded-full px-2 text-sm font-bold tracking-wider max-w-28 w-full",
                "justify-center items-center", // align
                booking.status === "arriving"
                  ? "bg-green-100 text-green-900"
                  : "bg-blue-200 text-blue-900",
              ].join(" ")}
            >
              {booking.status}
            </div>
            <div className="flex items-center">
              <img
                src={booking.user.flag}
                alt={`${booking.user.country}`}
                className="w-6 h-4 mr-2"
              />
              <span>{booking.user.name}</span>
            </div>
            <div className="">
              {booking.nights} {booking.nights > 1 ? "nights" : "night"}
            </div>
            <div className="bg-indigo-600 text-white uppercase rounded-xl text-center p-2 text-sm font-bold tracking-wider max-w-32 w-full">
              {booking.checkIn ? "Check In" : "Check Out"}
            </div>
          </div>
        ))}
      </DashboardCard>
    </>
  );
};

export default DashboardBookings;
