import React, { useState } from 'react';
import { 
  Music, 
  Search, 
  Play, 
  Pause, 
  Disc, 
  Sparkles, 
  Volume2, 
  Radio, 
  Heart,
  Clock
} from 'lucide-react';
import { HINDI_90S_SONGS, SONG_MOODS } from '../data/hindiSongs90s';

export default function HindiSongsSection({ 
  currentSong, 
  isPlaying, 
  onPlaySong, 
  onPauseSong 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('All');

  // Filter songs based on search query and mood filter
  const filteredSongs = HINDI_90S_SONGS.filter(song => {
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.singers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.composer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMood = selectedMood === 'All' || song.mood === selectedMood;

    return matchesSearch && matchesMood;
  });

  return (
    <section className="hindi-songs-section glass-panel">
      {/* Section Header */}
      <div className="hindi-songs-header">
        <div className="radio-badge-strip">
          <span className="radio-pill-tag">
            <Radio size={14} className="text-warning animate-pulse" /> 
            <span>DESI HIGHWAY NOSTALGIA RADIO</span>
          </span>
        </div>

        <h2 className="songs-section-title">
          90s Bollywood Highway Hits <span className="hindi-sub-title">(सफ़र के सदाबहार नगमे)</span>
        </h2>
        <p className="songs-section-sub">
          Iconic 90s Hindi classics for your midnight interstate journey. 
          <strong> Music plays continuously in background</strong> while you explore 3D bus views, select seats & reserve tickets.
        </p>
      </div>

      {/* Search & Mood Filter Bar */}
      <div className="songs-controls-bar">
        {/* Search Input */}
        <div className="song-search-box">
          <Search size={18} className="search-icon-music text-accent" />
          <input 
            type="text" 
            placeholder="Search Hindi 90s songs (e.g. Kumar Sanu, DDLJ, Chaiyya Chaiyya, Udit Narayan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="song-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Mood Filter Chips */}
        <div className="song-mood-chips">
          {SONG_MOODS.map(mood => (
            <button
              key={mood}
              type="button"
              className={`mood-chip-btn ${selectedMood === mood ? 'active' : ''}`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Song Cards Grid */}
      {filteredSongs.length === 0 ? (
        <div className="no-songs-found">
          <Disc size={36} className="text-muted spinning-icon" />
          <h4>No songs found for "{searchQuery}"</h4>
          <p>Try searching for Kumar Sanu, Alka Yagnik, Udit Narayan, or movie titles like Aashiqui or Mohra.</p>
          <button className="btn-secondary" onClick={() => { setSearchQuery(''); setSelectedMood('All'); }}>
            View All 90s Classics
          </button>
        </div>
      ) : (
        <div className="songs-cards-grid">
          {filteredSongs.map((song) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;
            const isThisSelected = currentSong?.id === song.id;

            return (
              <div 
                key={song.id} 
                className={`song-card ${isThisSelected ? 'song-card-active' : ''}`}
                onClick={() => {
                  if (isThisPlaying) {
                    onPauseSong();
                  } else {
                    onPlaySong(song);
                  }
                }}
              >
                {/* Vinyl / Cover Art Box */}
                <div className="song-cover-art" style={{ background: song.color }}>
                  <span className="cover-emoji">{song.coverEmoji}</span>
                  <div className={`disc-vinyl-overlay ${isThisPlaying ? 'disc-spinning' : ''}`}>
                    <div className="vinyl-center-hole"></div>
                  </div>
                  <button 
                    className="song-play-hover-btn" 
                    title={isThisPlaying ? 'Pause' : 'Play Song'}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isThisPlaying) onPauseSong();
                      else onPlaySong(song);
                    }}
                  >
                    {isThisPlaying ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" />}
                  </button>
                </div>

                {/* Song Meta Information */}
                <div className="song-meta-wrap">
                  <div className="song-title-row">
                    <h4 className="song-title" title={song.title}>{song.title}</h4>
                    {isThisPlaying && (
                      <div className="mini-equalizer">
                        <span className="eq-bar bar-1"></span>
                        <span className="eq-bar bar-2"></span>
                        <span className="eq-bar bar-3"></span>
                      </div>
                    )}
                  </div>

                  <div className="song-movie-year">
                    <span className="movie-name">{song.movie}</span>
                    <span className="dot-sep">•</span>
                    <span className="movie-year">{song.year}</span>
                  </div>

                  <p className="song-singers" title={song.singers}>
                    🎙️ {song.singers}
                  </p>

                  <div className="song-card-footer">
                    <span className="song-mood-tag">{song.mood}</span>
                    <span className="song-duration">
                      <Clock size={12} /> {song.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
