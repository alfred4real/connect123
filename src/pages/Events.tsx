import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      attendees: 1250,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
      organizer: "Tech Events Inc",
      isAttending: true,
      category: "Technology"
    },
    {
      id: 2,
      title: "Design Workshop",
      date: "March 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Creative Hub Downtown",
      attendees: 85,
      image: "https://images.unsplash.com/photo-1559223607-b4d0555ae73c?w=300&h=200&fit=crop",
      organizer: "Design Community",
      isAttending: false,
      category: "Design"
    },
    {
      id: 3,
      title: "Networking Mixer",
      date: "March 25, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Rooftop Bar & Lounge",
      attendees: 150,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop",
      organizer: "Business Network",
      isAttending: true,
      category: "Networking"
    },
    {
      id: 4,
      title: "Startup Pitch Day",
      date: "April 2, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Innovation Center",
      attendees: 300,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop",
      organizer: "Startup Accelerator",
      isAttending: false,
      category: "Business"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Events</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video w-full">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">by {event.organizer}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-primary" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <Button 
                      variant={event.isAttending ? "outline" : "default"} 
                      className="w-full"
                    >
                      {event.isAttending ? "Going" : "Attend Event"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;