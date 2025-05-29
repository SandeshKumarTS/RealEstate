
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerName: string | null;
  ownerPhone: string | null;
  propertyTitle: string;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  ownerName,
  ownerPhone,
  propertyTitle,
}) => {
  const handleCallOwner = () => {
    if (ownerPhone) {
      window.location.href = `tel:${ownerPhone}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Property Owner</DialogTitle>
          <DialogDescription>
            Get in touch about "{propertyTitle}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{ownerName || "Property Owner"}</p>
              <p className="text-sm text-muted-foreground">Property Owner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">{ownerPhone || "No phone number available"}</p>
              <p className="text-sm text-muted-foreground">Phone number</p>
            </div>
            {ownerPhone && (
              <Button onClick={handleCallOwner} size="sm">
                Call
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
