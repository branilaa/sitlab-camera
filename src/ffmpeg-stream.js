import ffmpeg from "fluent-ffmpeg"

export default function setupFFmpegStream(io) {
  const camera = 'video0'

  ffmpeg()
    .input(`/dev/${camera}`)
    .inputFormat('video4linux2')
    .inputOptions('-r 30') // Frame rate
    .outputFormat('mjpeg')
    .videoCodec('libx264')
    .size('640x480')
    .on('start', () => {
      console.log(`Streaming dalla fotocamera ${camera}`);
    })
    .on('end', () => {
      console.log('Streaming terminato');
    })
    .on('error', (err) => {
      console.error('Errore durante lo streaming:', err);
    })
    .pipe(io.to('video'))
}