# Dalco
Dalco is a simple command line tool I use to store various tools I make for my
own use as well as shorthands for various commands.

## Installation

`npm i -g https://github.com/ddgond/dalco`

## Commands
### compress
Compresses a video file using either a fixed bitrate or Constant Rate Factor. Defaults to a CRF of 30.

**Requires:** ffmpeg, which can be installed [here](https://ffmpeg.org/download.html).

**Usage:** `dalco compress [input] [output] -b [bitrate MB/s] -c [CRF]`

### generateSpell
Generates new D&D 5e spells by replacing words in existing ones.

**Usage:** `dalco generateSpell`

### serve
Runs an http file server in the current directory.

**Requires:** python3

**Usage:** `dalco serve 8000`

### update
Updates dalco to the most recent version.

**Usage:** `dalco update`
