# Thanks Jean Tinland (https://github.com/Jean-Tinland/simple-bar).
SPOTIFY_IS_RUNNING="$(osascript -e 'tell application "System Events" to (name of processes) contains "Spotify"' 2>&1)"

if [ "$SPOTIFY_IS_RUNNING" = true ]; then
  SPOTIFY_PLAYER_STATE="$(osascript -e 'tell application "Spotify" to player state as string' 2>/dev/null || echo "stopped")"
  SPOTIFY_TRACK_NAME="$(osascript -e 'tell application "Spotify" to name of current track as string' 2>/dev/null | tr \" \' || echo "unknown track")"
  SPOTIFY_ARTIST_NAME="$(osascript -e 'tell application "Spotify" to artist of current track as string' 2>/dev/null | tr \" \' || echo "unknown artist")"
fi

cat <<EOF
{
    "running": "$SPOTIFY_IS_RUNNING",
    "state": "$SPOTIFY_PLAYER_STATE",
    "track": "$SPOTIFY_TRACK_NAME",
    "artist": "$SPOTIFY_ARTIST_NAME"
}
EOF
