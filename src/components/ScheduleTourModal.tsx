
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { CalendarIcon, Clock } from "lucide-react";

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  ownerPhone: string | null;
}

const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  ownerPhone,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleScheduleTour = () => {
    if (!selectedDate || !selectedTime || !visitorName || !visitorPhone) {
      toast.error("Please fill in all fields");
      return;
    }

    // Format the date
    const formattedDate = selectedDate.toLocaleDateString();
    
    // Create a simple message for the property owner
    const message = `Tour Request for ${propertyTitle}\n\nVisitor: ${visitorName}\nPhone: ${visitorPhone}\nDate: ${formattedDate}\nTime: ${selectedTime}`;
    
    // You could integrate with a real scheduling system here
    // For now, we'll just show a success message
    toast.success("Tour request sent! The property owner will contact you soon.");
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime("");
    setVisitorName("");
    setVisitorPhone("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto z-[100] bg-white">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">Schedule a House Tour</DialogTitle>
          <DialogDescription className="text-base">
            Book a visit for "{propertyTitle}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 p-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visitorName" className="text-sm font-medium">Your Name</Label>
              <Input
                id="visitorName"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitorPhone" className="text-sm font-medium">Your Phone</Label>
              <Input
                id="visitorPhone"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                placeholder="Enter your phone"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="h-4 w-4" />
              Select Date
            </Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border bg-white"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Select Time
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="h-9"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1 order-2 sm:order-1">
              Cancel
            </Button>
            <Button onClick={handleScheduleTour} className="flex-1 order-1 sm:order-2">
              Schedule Tour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleTourModal;
