export const DEFAULT_VOLUME = window.innerWidth <= 700 ? 1 : 0.5

let lastNonInfiniteBitrate = null

const addBitrateText = (bitrate, kind) => {
    return `${kind} ${bitrate} kb / s`
}

export const prepareBitrateForDisplay = (bitrate, kind) => {
    if (!bitrate || bitrate === 0) return addBitrateText(0, kind)

    if (bitrate === Infinity) {
        // video bitrate can sometimes be Infinity
        return lastNonInfiniteBitrate || addBitrateText(0, kind)
    }

    const value = (bitrate / 8 / 1000).toFixed(0)
    const result = addBitrateText(value, kind)

    if (kind.toLowerCase() === 'video') lastNonInfiniteBitrate = result

    return result
}
