# Site screenshots

JPEGs shown by `index.html`, one light and one dark per screen, named `<device>-<screen>-<light|dark>.jpg`.
A device's tab only appears once its first screenshot exists.

## iPhone and iPad

Taken in the simulator from a Debug build with sample data, then resized:

1. Launch once with `-SeedSampleData`.
2. Mute alerts so the notification prompt never appears: `xcrun simctl spawn <device> defaults write net.echin.easefamily mutedNotificationScopes -array personal <Lim Family ID>`, then reboot the simulator.
3. For each screen, launch with `-pinnedTabs <screen>,…` and run `xcrun simctl io <device> screenshot`.
4. Repeat with `xcrun simctl ui <device> appearance dark`.
5. Resize: `magick <file>.png -resize x1100 -strip -quality 80 <file>.jpg` (`x1200` for iPad).

## Mac

Use a separate macOS user account, so the sample family doesn't sync into your real iCloud.

1. Run the Debug app with the launch arguments `-SeedSampleData -pinnedTabs today,calendar,money`.
2. For Today, Calendar and Money, press ⇧⌘4, then Space, and click the EaseFamily window.
3. Switch System Settings → Appearance to Dark and repeat.
4. Save as `mac-today-light.png`, `mac-today-dark.png`, `mac-calendar-…`, `mac-money-…`.
5. Resize: `magick <file>.png -resize 1600x -strip -quality 80 <file>.jpg`.
