printf "$(ps -A -o %cpu | awk "{c += \$1} END {print c/"$(sysctl -n hw.ncpu)"}")"
