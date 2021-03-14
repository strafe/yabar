printf "$(pmset -g batt | awk {'print $3 $4'} | sed -e s/from\'// -e s/%\;charged\;//)"
