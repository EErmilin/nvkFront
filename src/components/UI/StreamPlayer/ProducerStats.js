const STATS_REQUEST_INTERVAL = 1000

export class ProducerTracker {
    cloudInstance = null
    onBitrate = null
    getterInterval = null

    audioProducer = null
    videoProducer = null

    stopped = false

    constructor(cloudInstance, onBitrate) {
        this.cloudInstance = cloudInstance
        this.onBitrate = onBitrate

        console.log('[ProducerTracker.constructor] Initialized a service')

        this.getterInterval = setInterval(() => {
            this.getStats()
        }, STATS_REQUEST_INTERVAL)

        console.log(
            `[ProducerTracker.constructor] Created interval for ProducersStats every ${STATS_REQUEST_INTERVAL}`
        )
    }

    getStats = async () => {
        if (!this.audioProducer && !this.videoProducer) {
            return console.log('[ProducerTracker.getStats] No producers')
        }

        if (!this.cloudInstance) {
            return console.log(
                '[ProducerTracker.getStats] No Cloud Instance found!'
            )
        }

        // console.log(`[ProducerTracker.getStats] for Audio: ${this.audioProducer} Video: ${this.videoProducer}`)

        const stats = await this.cloudInstance.producersStats({
            ids: [this.audioProducer, this.videoProducer],
        })

        const videoStats = stats[this.videoProducer]
        const audioStats = stats[this.audioProducer]

        const videoBitrate = videoStats?.length ? videoStats[0].bitrate : 0
        const audioBitrate = audioStats?.length ? audioStats[0].bitrate : 0

        // console.log(`[ProducerTracker.getStats] Audio bitrate: ${audioBitrate}. Video bitrate: ${videoBitrate}. IsStopped: ${this.stopped}`)

        if (!this.onBitrate)
            return console.log(
                '[ProducerTracker.getStats] No onBitrate() function provided'
            )

        if (this.stopped)
            return console.log(
                "[ProducerTracker.getStats] Service is stopped, bitrate won't be send"
            )

        this.onBitrate({
            bitRate: videoBitrate,
            kind: 'video',
        })

        this.onBitrate({
            bitRate: audioBitrate,
            kind: 'audio',
        })
    }

    onProducer = (id, kind) => {
        console.log(
            `[ProducerTracker.onProducer] New producer for ${kind}: ${id}`
        )

        if (kind === 'audio') {
            this.audioProducer = id
        } else if (kind === 'video') {
            this.videoProducer = id
        }
    }

    stopService = () => {
        if (this.getterInterval) {
            clearInterval(this.getterInterval)
            this.getterInterval = null
            this.cloudInstance = null
            console.log(`[ProducerTracker.stopService] Cleared interval`)
        }

        this.stopped = true

        console.log(`[ProducerTracker.stopService] Stopped service`)
    }
}
