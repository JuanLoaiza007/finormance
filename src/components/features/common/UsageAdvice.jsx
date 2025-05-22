"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UsageAdvice() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"text-primary"}>Advertencia</DialogTitle>
          </DialogHeader>
          <DialogDescription className={"text-foreground"}>
            Esta aplicación es un simulador. Los resultados no representan
            garantías de rendimiento real y no deben considerarse asesoría
            financiera. Úsala como una herramienta de apoyo para tomar
            decisiones informadas.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
