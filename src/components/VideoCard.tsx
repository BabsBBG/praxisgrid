import { ExternalLink, PlayCircle } from "lucide-react";
import type { VideoResource } from "../data/videos";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function VideoCard({ video }: { video: VideoResource }) {
  return (
    <Card className="aq-row-card">
      <CardHeader>
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge className="border-[var(--aq-blue-600)] bg-[var(--aq-blue-700)] text-white">{video.exam}</Badge>
            <Badge>{video.duration}</Badge>
          </div>
          <CardTitle>{video.title}</CardTitle>
          <p className="mt-1 text-sm font-semibold text-[var(--aq-muted)]">{video.source}</p>
        </div>
        <PlayCircle className="h-8 w-8 text-[var(--aq-blue-600)]" />
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-[var(--aq-muted)]">{video.description}</p>
        <p className="text-sm font-semibold text-[var(--aq-muted)]">Domain: {video.domain}</p>
        <Button asChild variant="hero" size="lg" className="w-full">
          <a href={video.url} target="_blank" rel="noreferrer">Open official resource <ExternalLink className="h-5 w-5" /></a>
        </Button>
      </CardContent>
    </Card>
  );
}
