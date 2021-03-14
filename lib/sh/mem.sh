printf "$(ps -A -o %mem | awk '{m += $1} END {print m}')"
