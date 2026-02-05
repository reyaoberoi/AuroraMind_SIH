import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Link2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

const Music = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [recent, setRecent] = useState<Array<{title:string, artist:string}>>([
    { title: 'Future Bass', artist: 'Pixabay' },
    { title: 'LoFi Study', artist: 'Various' },
    { title: 'Calm Piano', artist: 'Various' },
  ]);
  const moodData = [
    { t: 'Mon', mood: 60 },
    { t: 'Tue', mood: 45 },
    { t: 'Wed', mood: 70 },
    { t: 'Thu', mood: 50 },
    { t: 'Fri', mood: 80 },
    { t: 'Sat', mood: 65 },
    { t: 'Sun', mood: 75 },
  ];

  const src = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_0f4a6b4e3e.mp3?filename=future-bass-110452.mp3";

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.pause(); else el.play();
    setPlaying(!playing);
  };

  const onTime = () => {
    const el = audioRef.current; if (!el) return;
    setProgress((el.currentTime / el.duration) * 100 || 0);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current; if (!el) return;
    const pct = Number(e.target.value);
    el.currentTime = (pct / 100) * el.duration;
    setProgress(pct);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value); setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="p-6">
          <div className="bg-gradient-to-br from-zinc-50/70 to-white/40 border border-border/50 rounded-2xl p-6 shadow-neon-purple/10">
            <div className="grid grid-cols-12 gap-6">
              {/* Left: Artwork & Track Info */}
              <div className="col-span-12 md:col-span-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-neon-purple/30 to-neon-teal/30" />
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold">Future Bass</h3>
                  <p className="text-muted-foreground">Pixabay Artists • Single</p>
                </div>
                {/* Playlist Embed */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-sm mb-2"><Link2 className="h-4 w-4"/> Add your Spotify/Apple playlist</div>
                  <input
                    type="url"
                    value={playlistUrl}
                    onChange={(e)=>setPlaylistUrl(e.target.value)}
                    placeholder="Paste Spotify or Apple Music URL"
                    className="w-full rounded-md border border-border/50 bg-white/60 px-3 py-2"
                  />
                  {playlistUrl && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      {playlistUrl.includes("open.spotify.com") ? (
                        <iframe
                          style={{ borderRadius: 12 }}
                          src={playlistUrl.replace("open.spotify.com/", "open.spotify.com/embed/")}
                          width="100%"
                          height="352"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      ) : playlistUrl.includes("music.apple.com") ? (
                        <iframe
                          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                          height="350"
                          style={{ width: '100%', overflow: 'hidden', background: 'transparent' }}
                          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-top-navigation"
                          src={playlistUrl.replace("/", "/embed/")}
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Player Controls + lists + mood graph */}
              <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                <audio ref={audioRef} src={src} onTimeUpdate={onTime} onEnded={()=>setPlaying(false)} />
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Shuffle className="h-5 w-5 text-muted-foreground" />
                  <SkipBack className="h-6 w-6" />
                  <button onClick={togglePlay} className="h-14 w-14 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center">
                    {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                  </button>
                  <SkipForward className="h-6 w-6" />
                  <Repeat className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground min-w-[28px] text-right">0:00</span>
                  <input type="range" min={0} max={100} value={progress} onChange={onSeek} className="w-full accent-neon-purple" />
                  <span className="text-xs text-muted-foreground min-w-[28px]">3:20</span>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <input type="range" min={0} max={1} step={0.01} value={volume} onChange={onVolume} className="w-40 accent-neon-teal" />
                </div>

                <div className="grid grid-cols-12 gap-6 mt-8">
                  <div className="col-span-12 md:col-span-6">
                    <div className="font-semibold mb-2">Currently Playing</div>
                    <div className="text-sm text-muted-foreground">Future Bass — Pixabay</div>
                    <div className="font-semibold mt-4 mb-2">Recently Played</div>
                    <ul className="text-sm space-y-1">
                      {recent.map((r, i)=>(<li key={i}>{r.title} — {r.artist}</li>))}
                    </ul>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="font-semibold mb-2">Mood Analyzer</div>
                    <ChartContainer config={{ mood: { label: 'Mood', color: 'hsl(270 80% 50%)' } }} className="h-48">
                      <LineChart data={moodData}>
                        <XAxis dataKey="t" hide />
                        <YAxis hide domain={[0,100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="mood" stroke="var(--color-mood)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;


