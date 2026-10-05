import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Radio, 
  Music2, 
  ChevronDown, 
  ChevronUp,
  Disc,
  Sparkles
} from 'lucide-react';
import { HINDI_90S_SONGS } from '../data/hindiSongs90s';

export default function GlobalMusicBar({ 
  currentSong, 
  isPlaying, 
  onTogglePlay, 
  onNextSong, 
  onPrevSong,
  volume,
  onVolumeChange,
  progressSec
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!currentSong) return null;

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange(prevVolume || 0.8);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      onVolumeChange(0);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = Math.min(100, (progressSec / currentSong.durationSec) * 100);

  return (
    <div className={`global-music-bar-container ${isCollapsed ? 'player-collapsed' : ''}`}>
      <div className="music-bar-wrapper glass-panel">
        
        {/* Progress Timeline on Top Edge */}
        <div className="music-progress-timeline">
          <div 
            className="music-progress-fill" 
            style={{ width: `${progressPercent}%`, background: currentSong.color }}
          ></div>
        </div>

        <div className="music-bar-inner">
          
          {/* Left: Track Information & Spinning Vinyl */}
          <div className="player-track-info">
            <div 
              className="player-album-art"
              style={{ background: currentSong.color }}
            >
              <span className="player-emoji">{currentSong.coverEmoji}</span>
              <div className={`player-vinyl-disc ${isPlaying ? 'vinyl-spinning' : ''}`}></div>
            </div>

            <div className="player-titles">
              <div className="title-with-badge">
                <strong className="player-song-name" title={currentSong.title}>
                  {currentSong.title}
                </strong>
                <span className="live-highway-radio-tag">
                  <Radio size={11} className="text-warning animate-pulse" /> Coach Radio
                </span>
              </div>
              <span className="player-artist-text">
                {currentSong.movie} ({currentSong.year}) • {currentSong.singers}
              </span>
            </div>
          </div>

          {/* Center: Playback Controls & Progress Bar */}
          <div className="player-center-controls">
            <div className="control-buttons-row">
              <button 
                className="btn-player-skip" 
                onClick={onPrevSong}
                title="Previous 90s Track"
              >
                <SkipBack size={18} />
              </button>

              <button 
                className="btn-player-play" 
                onClick={onTogglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" />}
              </button>

              <button 
                className="btn-player-skip" 
                onClick={onNextSong}
                title="Next 90s Track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <div className="player-scrub-row">
              <span className="time-display current-time">{formatTime(progressSec)}</span>
              <div className="scrubber-bar-track">
                <div 
                  className="scrubber-bar-progress" 
                  style={{ width: `${progressPercent}%` }}
                >
                  <span className="scrubber-thumb"></span>
                </div>
              </div>
              <span className="time-display total-time">{currentSong.duration}</span>
            </div>
          </div>

          {/* Right: Audio Visualizer, Volume Slider & Collapse */}
          <div className="player-right-actions">
            
            {/* Live Audio Visualizer Equalizer */}
            <div className="audio-equalizer-display" title="Live Highway Audio Waves">
              <span className={`bar-eq ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.1s' }}></span>
              <span className={`bar-eq ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.3s' }}></span>
              <span className={`bar-eq ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.2s' }}></span>
              <span className={`bar-eq ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.4s' }}></span>
              <span className={`bar-eq ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.25s' }}></span>
            </div>

            {/* Volume Control */}
            <div className="volume-slider-group">
              <button className="btn-volume-mute" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setIsMuted(val === 0);
                  onVolumeChange(val);
                }}
                className="volume-slider"
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
            </div>

            {/* Collapse / Minimize Toggle */}
            <button 
              className="btn-collapse-player" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? 'Expand Player' : 'Minimize Player'}
            >
              {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
