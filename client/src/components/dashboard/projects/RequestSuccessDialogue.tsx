import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function RequestSuccessDialogue({
  open,
  onChange,
}: {
  open: boolean;
  onChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Successful ✅</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            Your request has been submitted successfully. We'll respond shortly,
            typically within 5 minutes.
          </p>
          <strong>What to expect next:</strong>

          <ul className="list-inside list-disc">
            <li>
              A project manager will reach out to you on this app to discuss your request.
            </li>
            <li>
              You'll receive a notification when your request is accepted.
            </li>
            <li>
              You'll be able to track the progress of your request on your
              dashboard.
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Button asChild type="submit" className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
