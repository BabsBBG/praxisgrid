import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { docs } from "../data/docs";
import { DocSection } from "../components/DocSection";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Docs() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <Card className="aq-hero">
        <CardHeader>
          <div>
            <Badge className="mb-3 border-[var(--aq-blue-600)] bg-[var(--aq-blue-700)] text-white">Docs Hub</Badge>
            <CardTitle className="text-3xl">Official Microsoft Learn resources</CardTitle>
            <p className="mt-2 font-semibold text-[var(--aq-muted)]">Study guides, exam pages, certification pages, and learning paths.</p>
          </div>
          <FileText className="h-10 w-10 text-[var(--aq-blue-600)]" />
        </CardHeader>
      </Card>
      <div className="grid gap-5">{Object.entries(docs).map(([key, doc]) => <DocSection key={key} examKey={key} doc={doc} />)}</div>
    </motion.div>
  );
}
