printf "$(pmset -g batt | awk {'print $3 $4'} | sed -Ee s/from\'// -e s/%\;\(charged\|charging\|discharging\)\;//)"
