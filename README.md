# Dalco
Dalco is a simple command line tool I use to store various tools I make for my
own use as well as shorthands for various commands.

## Commands
### compress
Compresses a video file using either a fixed bitrate or Constant Rate Factor. Defaults to a CRF of 30.

**Requires**: ffmpeg, which can be installed [here](https://ffmpeg.org/download.html).

**Usage:** `dalco compress [input] [output] -b [bitrate MB/s] -c [CRF]`
