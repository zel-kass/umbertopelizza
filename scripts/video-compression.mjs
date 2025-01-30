import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputFile = 'public/videos/BANDEDEMOFINAL.mp4';
const outputFile = 'public/videos/BANDEDEMOFINAL_compressed.mp4';
const outputHLS = 'public/videos/BANDEDEMOFINAL.m3u8';

// Compress the video
ffmpeg(inputFile)
  .outputOptions([
    '-c:v libx264',
    '-crf 23',
    '-preset slow',
    '-c:a aac',
    '-b:a 128k',
    '-movflags +faststart'
  ])
  .output(outputFile)
  .on('end', () => {
    console.log('Compression finished');
    // Generate HLS stream
    ffmpeg(outputFile)
      .outputOptions([
        '-c:v libx264',
        '-c:a aac',
        '-b:a 128k',
        '-hls_time 10',
        '-hls_playlist_type vod',
        '-hls_segment_filename', 'public/videos/BANDEDEMOFINAL_%03d.ts'
      ])
      .output(outputHLS)
      .on('end', () => console.log('HLS conversion finished'))
      .run();
  })
  .run();