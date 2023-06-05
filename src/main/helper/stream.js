import ytdl from 'ytdl-core'
import { join, resolve } from 'path'
import { createWriteStream } from 'fs'


export default (url) => {
    let path = join(__dirname, '../renderer/assets/audio.mp3')
    let file = createWriteStream(path)
    return new Promise((resolve, reject) => {
        ytdl(url, { filter: 'audioonly' })
            .pipe(file)
            .on('finish', () => resolve(true))
            .on('error', () => reject('Error'))
    })
}