import { useState } from "react";
import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Languages, UserCheck, Star } from "lucide-react";

// --- Mock Data for Counselors ---
// For demonstration, I'm creating a detailed mock data array.
// You can replace this with your actual data fetching from `DataApi.counsellors`.
const mockCounselors = [
  {
    id: 1,
    name: "Dr. Anya Sharma",
    avatar: "https://placehold.co/100x100/EAD9F2/4A2C59?text=AS",
    specialties: ["Anxiety", "Stress Management", "CBT"],
    experience: 8,
    languages: ["English", "Hindi"],
    bio: "Dr. Sharma specializes in cognitive-behavioral therapy to help clients overcome anxiety and build resilience.",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Rohan Desai",
    avatar: "https://placehold.co/100x100/D2EBF5/2C4A59?text=RD",
    specialties: ["Depression", "Relationship Issues"],
    experience: 5,
    languages: ["English", "Gujarati"],
    bio: "Rohan focuses on creating a safe space to explore emotions and improve interpersonal relationships.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Priya Singh",
    avatar: "https://placehold.co/100x100/F5E4D2/594A2C?text=PS",
    specialties: ["Sleep Therapy", "Mindfulness"],
    experience: 6,
    languages: ["English"],
    bio: "Priya uses mindfulness techniques to guide clients towards better sleep hygiene and mental clarity.",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Dr. Vikram Rao",
    avatar: "https://placehold.co/100x100/D2F5E4/2C594A?text=VR",
    specialties: ["Trauma", "PTSD", "EMDR"],
    experience: 12,
    languages: ["English", "Kannada"],
    bio: "With over a decade of experience, Dr. Rao is an expert in trauma-informed care and recovery.",
    rating: 5.0,
  }
];

// --- Mock Available Slots ---
// This would typically come from an API based on the selected date.
const availableTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
const availableDates = [new Date(), new Date(Date.now() + 86400000), new Date(Date.now() + 2 * 86400000)]; // Today, Tomorrow, Day after

const CounsellingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // You can replace `mockCounselors` with your actual fetched data
  const counselors = mockCounselors; 

  const handleBookSession = () => {
    if (selectedDate && selectedTime) {
      setIsBookingConfirmed(true);
      // Here you would typically make an API call to finalize the booking.
      console.log(`Booking confirmed for ${selectedDate.toDateString()} at ${selectedTime}`);
    }
  };

  const resetBookingState = () => {
      setSelectedDate(null);
      setSelectedTime(null);
      setIsBookingConfirmed(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <main className="flex-1 p-6 lg:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">CareConnect</h1>
            <p className="text-gray-500 mt-1">Find the right support to guide you on your wellness journey.</p>
          </header>
          
          {/* --- Filters --- */}
          <div className="mb-6 flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200/80">
            <span className="font-medium text-gray-700">Filter by:</span>
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-50">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anxiety">Anxiety</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="relationship">Relationship</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] bg-gray-50">
                <SelectValue placeholder="Any Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="gujarati">Gujarati</SelectItem>
                <SelectItem value="kannada">Kannada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* --- Counselors Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselors.map((c) => (
              <Card key={c.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-start gap-4 p-4 bg-gray-50/50">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                    <AvatarImage src={c.avatar} alt={c.name} />
                    <AvatarFallback>{c.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                        <Star className="h-4 w-4 fill-current"/>
                        <span>{c.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {c.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{c.bio}</p>
                   <div className="mt-4 space-y-2 text-sm text-gray-500">
                       <div className="flex items-center gap-2"><UserCheck className="h-4 w-4"/><span>{c.experience} years experience</span></div>
                       <div className="flex items-center gap-2"><Languages className="h-4 w-4"/><span>{c.languages.join(', ')}</span></div>
                   </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50/50">
                  <Dialog onOpenChange={(open) => !open && resetBookingState()}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Book a Session</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      {!isBookingConfirmed ? (
                        <>
                          <DialogHeader>
                            <DialogTitle>Book a Session with {c.name}</DialogTitle>
                            <DialogDescription>Select a date and time that works for you.</DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            {/* --- Date Selection --- */}
                            <div>
                               <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-700"><Calendar className="h-5 w-5"/>Select a Date</h4>
                               <div className="flex gap-2">
                                   {availableDates.map(date => (
                                       <Button key={date.toISOString()} variant={selectedDate?.toISOString() === date.toISOString() ? "default" : "outline"} onClick={() => setSelectedDate(date)}>
                                           {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                                       </Button>
                                   ))}
                               </div>
                            </div>
                            {/* --- Time Slot Selection --- */}
                            {selectedDate && (
                                <div>
                                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-700"><Clock className="h-5 w-5"/>Select a Time</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {availableTimeSlots.map(time => (
                                            <Button key={time} variant={selectedTime === time ? "default" : "outline"} onClick={() => setSelectedTime(time)}>{time}</Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button onClick={handleBookSession} disabled={!selectedDate || !selectedTime}>Confirm Booking</Button>
                          </DialogFooter>
                        </>
                      ) : (
                        // --- Confirmation Screen ---
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <DialogTitle className="mt-4 text-2xl font-bold">Booking Confirmed!</DialogTitle>
                            <DialogDescription className="mt-2 text-gray-600">
                                Your session with {c.name} on <br/><strong>{selectedDate?.toLocaleDateString('en-US', { dateStyle: 'long' })}</strong> at <strong>{selectedTime}</strong> is confirmed.
                            </DialogDescription>
                            <DialogFooter className="mt-6 justify-center">
                               <p className="text-xs text-gray-400">You will receive a confirmation email shortly.</p>
                            </DialogFooter>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CounsellingPage;
