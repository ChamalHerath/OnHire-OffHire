import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export default function NexGenDialog({ open, onClose, data }) {
  return (
    <div>
      <Dialog
        size="xl"
        className="dark:bg-gray-800"
        open={open}
        handler={onClose}
      >
        <DialogHeader className="justify-center p-5">
          <Typography className="text-center" variant="h5" color="blue-gray">
            <span className="p-2 mr-5 bg-gray-200 rounded-lg">
              Fault Report ID: {data && data[0].frid}
            </span>
            <span className="p-2 mr-5 bg-gray-200 rounded-lg">
              Plant Code: {data && data[0].plantCode}
            </span>
            <span className="p-2 bg-gray-200 rounded-lg">
              Date: {data && data[0].submittedDate}
            </span>
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={onClose}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
