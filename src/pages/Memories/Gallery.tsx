import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Camera, Calendar, MapPin, X, Play } from 'lucide-react';

// Direct imports from src/assets/photos/
import firstDateImg from '../../assets/photos/first date in leb.png';
import partyImg from '../../assets/photos/ana wiyeke  w bentna l jahshe.png';
import reyyeImg from '../../assets/photos/bl ouwe réyyé.png';
import reactImg from '../../assets/photos/how i thought you will react.jpeg';
import mazroukeGif from '../../assets/photos/mazrouke.gif';
import arguileImg from '../../assets/photos/mnhrob mn haflet la n2argel.png';
import poseImg from '../../assets/photos/our pose.png';
import proofImg from '../../assets/photos/proof.png';
import teddyImg from '../../assets/photos/teddybears.png';
import roueImg from '../../assets/photos/roue.png';
import vidFile from '../../assets/photos/vid.mp4';

interface MemoryLog {
  id: string;
  logNumber: string;
  title: string;
  date: string;
  location: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tag: string;
  caption: string;
  labNotes: string;
}

const MEMORY_LOGS: MemoryLog[] = [
  {
    id: 'mem-1',
    logNumber: 'LOG-#001',
    title: 'First date in lebanon',
    date: 'First Date',
    location: 'Al Hallab, Trablos ya madinetna',
    mediaUrl: firstDateImg,
    mediaType: 'image',
    tag: 'Milestone',
    caption: 'The moment you made me fall deeper for Trablos.',
    labNotes: 'Subject exhibited continuous smiling. Serotonin levels spiked immediately upon interaction.',
  },
  {
    id: 'mem-2',
    logNumber: 'LOG-#002',
    title: 'Party with daughter',
    date: 'Summer Weekend',
    location: 'Sport Beach',
    mediaUrl: partyImg,
    mediaType: 'image',
    tag: 'Field Research',
    caption: 'Having fun',
    labNotes: 'Observation: Subject knows the scientific lyric of every song. An attractive trait.',
  },
  {
    id: 'mem-3',
    logNumber: 'LOG-#003',
    title: 'Bl ouwe réyyé',
    date: 'Unknown',
    location: 'Unknown',
    mediaUrl: reyyeImg,
    mediaType: 'image',
    tag: 'Life',
    caption: 'Kaan ma fi ela réyyé design lal clothes, AND i have to match.',
    labNotes: 'Caffeine intake high, but emotional battery 100% recharged via hugs.',
  },
  {
    id: 'mem-4',
    logNumber: 'LOG-#004',
    title: 'Previous reactions on romantic advances',
    date: 'Anniversary',
    location: 'Bet ekhtik',
    mediaUrl: reactImg,
    mediaType: 'image',
    tag: 'Celebration',
    caption: 'Testing the hypothesis that you hated these things, and found proof above',
    labNotes: 'Hypothesis confirmed. Conclusion: After loosing the first book this was the reaction for the second, all evidence points towards hypothesis',
  },
  {
    id: 'mem-5',
    logNumber: 'LOG-#005',
    title: 'Mazrouke',
    date: 'Unknown',
    location: 'Had l bet',
    mediaUrl: mazroukeGif,
    mediaType: 'image',
    tag: 'Life',
    caption: 'Testing the hypothesis that subject has the smallest bladder',
    labNotes: 'Hypothesis confirmed. Conclusion: i will need to time me going to the bathroom in the future.',
  },
  {
    id: 'mem-6',
    logNumber: 'LOG-#006',
    title: 'Edmen arguile',
    date: 'Party',
    location: 'Wadina',
    mediaUrl: arguileImg,
    mediaType: 'image',
    tag: 'Celebration',
    caption: 'Testing the hypothesis that subjects shows severe addiction to arguile',
    labNotes: 'Hypothesis confirmed. Conclusion: if mad 3mela arguile',
  },
  {
    id: 'mem-7',
    logNumber: 'LOG-#007',
    title: 'Go to pic pose',
    date: 'Everytime',
    location: 'Everywhere',
    mediaUrl: poseImg,
    mediaType: 'image',
    tag: 'Pictures',
    caption: 'Testing the hypothesis that kisses and smiles are correlated in some way.',
    labNotes: 'Hypothesis confirmed. Conclusion: the touch of our lips instantly make the significant other smile.',
  },
  {
    id: 'mem-8',
    logNumber: 'LOG-#008',
    title: 'Sleepy head pushover',
    date: 'Everynight',
    location: 'Any bed',
    mediaUrl: proofImg,
    mediaType: 'image',
    tag: 'Sleeping position',
    caption: 'Testing the hypothesis that babygirl takes over my side of the bed.',
    labNotes: 'Hypothesis confirmed. Conclusion: Subject doesnt like one side of the bed, but all the bed',
  },
  {
    id: 'mem-9',
    logNumber: 'LOG-#009',
    title: 'Teddy bears are ADORABLE',
    date: 'Someday',
    location: 'Belgium?',
    mediaUrl: teddyImg,
    mediaType: 'image',
    tag: 'Teddybears',
    caption: 'Testing the hypothesis that subject adores teddybears',
    labNotes: 'Hypothesis confirmed. Conclusion: If things go south, buy her a teddybear',
  },
  {
    id: 'mem-10',
    logNumber: 'LOG-#010',
    title: 'Us on the ferris wheel',
    date: 'Unknown',
    location: 'The beach',
    mediaUrl: roueImg,
    mediaType: 'image',
    tag: 'Having fun',
    caption: 'No testing this time, i just like this picture of us',
    labNotes: 'Conclusion : ...',
  },
  {
    id: 'mem-11',
    logNumber: 'LOG-#011',
    title: 'My proudest moment',
    date: 'Before us became a thing',
    location: 'Bet fattoum w moudi l adim',
    mediaUrl: vidFile,
    mediaType: 'video',
    tag: 'Pride',
    caption: 'Testing the hypothesis that I am the one that understands you the most',
    labNotes: 'Hypothesis confirmed. Conclusion: Forever looks great on us.',
  },
];

export default function Gallery() {
  const { setActiveGame } = useAppStore();
  const [selectedLog, setSelectedLog] = useState<MemoryLog | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-lg z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lab</span>
      </button>

      <div className="max-w-5xl w-full space-y-8 relative z-10 my-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-1 shadow-lg shadow-purple-500/10">
            <Camera className="w-9 h-9 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Memory Specimen Gallery
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Documented timeline logs and observational records from our shared experiments.
          </p>
        </div>

        {/* Specimen Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMORY_LOGS.map((log) => (
            <motion.div
              key={log.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedLog(log)}
              className="bg-slate-900/80 border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/20 backdrop-blur-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              {/* Media Preview Container */}
              <div className="relative h-48 overflow-hidden bg-slate-950 flex items-center justify-center">
                {log.mediaType === 'video' ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                    <video
                      src={log.mediaUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="p-3 bg-purple-500/80 rounded-full text-white shadow-lg backdrop-blur-sm">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={log.mediaUrl}
                    alt={log.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                <div className="absolute top-2 left-2 bg-slate-950/80 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono text-purple-300 z-10">
                  {log.logNumber}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {log.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-pink-400" />
                    {log.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed pt-1">
                  {log.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl w-full bg-slate-900 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLog(null)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-rose-600 text-white p-2 rounded-full border border-slate-700 z-20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Media Display */}
              <div className="relative h-72 md:h-80 bg-slate-950 flex items-center justify-center">
                {selectedLog.mediaType === 'video' ? (
                  <video
                    src={selectedLog.mediaUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedLog.mediaUrl}
                    alt={selectedLog.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Modal Details */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider">
                      {selectedLog.logNumber} &bull; {selectedLog.tag}
                    </span>
                    <h2 className="text-2xl font-black text-white">{selectedLog.title}</h2>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-pink-400" />
                    {selectedLog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    {selectedLog.location}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedLog.caption}
                </p>

                {/* Lab Notes Box */}
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono text-purple-300 space-y-1">
                  <p className="text-[10px] uppercase text-slate-500">Lab Observations:</p>
                  <p>&ldquo;{selectedLog.labNotes}&rdquo;</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}