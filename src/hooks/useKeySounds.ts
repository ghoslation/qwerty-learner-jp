import { KEY_SOUND_URL_PREFIX, SOUND_URL_PREFIX, keySoundResources } from '@/resources/soundResource'
import { hintSoundsConfigAtom, keySoundsConfigAtom } from '@/store'
import noop from '@/utils/noop'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'

export type PlayFunction = () => void

export default function useKeySound(): [PlayFunction, PlayFunction, PlayFunction] {
  const { isOpen: isKeyOpen, isOpenClickSound, volume: keyVolume, resource: keyResource } = useAtomValue(keySoundsConfigAtom)
  const setKeySoundsConfig = useSetAtom(keySoundsConfigAtom)
  const {
    isOpen: isHintOpen,
    isOpenWrongSound,
    isOpenCorrectSound,
    volume: hintVolume,
    wrongResource,
    correctResource,
  } = useAtomValue(hintSoundsConfigAtom)
  const [keySoundUrl, setKeySoundUrl] = useState(`${KEY_SOUND_URL_PREFIX}${keyResource.filename}`)
  const activeAudioRef = useRef<HTMLAudioElement[]>([])

  useEffect(() => {
    if (!keySoundResources.some((item) => item.filename === keyResource.filename && item.key === keyResource.key)) {
      const defaultKeySoundResource = keySoundResources.find((item) => item.key === 'Default') || keySoundResources[0]

      setKeySoundUrl(`${KEY_SOUND_URL_PREFIX}${defaultKeySoundResource.filename}`)
      setKeySoundsConfig((prev) => ({ ...prev, resource: defaultKeySoundResource }))
    }
  }, [keyResource, setKeySoundsConfig])

  useEffect(() => {
    return () => {
      activeAudioRef.current.forEach((audio) => {
        audio.pause()
        audio.src = ''
      })
      activeAudioRef.current = []
    }
  }, [])

  const playAudio = useCallback((src: string, volume: number) => {
    if (typeof Audio === 'undefined') return

    const audio = new Audio(src)
    audio.volume = volume
    audio.preload = 'auto'
    audio.currentTime = 0

    const cleanup = () => {
      audio.onended = null
      audio.onerror = null
      activeAudioRef.current = activeAudioRef.current.filter((item) => item !== audio)
      audio.src = ''
    }

    audio.onended = cleanup
    audio.onerror = cleanup
    activeAudioRef.current.push(audio)

    const playResult = audio.play()
    if (playResult) {
      playResult.catch(cleanup)
    }
  }, [])

  const playClickSound = useCallback(() => {
    playAudio(keySoundUrl, keyVolume)
  }, [keySoundUrl, keyVolume, playAudio])
  const playWrongSound = useCallback(() => {
    playAudio(`${SOUND_URL_PREFIX}${wrongResource.filename}`, hintVolume)
  }, [hintVolume, playAudio, wrongResource.filename])
  const playCorrectSound = useCallback(() => {
    playAudio(`${SOUND_URL_PREFIX}${correctResource.filename}`, hintVolume)
  }, [hintVolume, playAudio, correctResource.filename])

  return [
    isKeyOpen && isOpenClickSound ? playClickSound : noop,
    isHintOpen && isOpenWrongSound ? playWrongSound : noop,
    isHintOpen && isOpenCorrectSound ? playCorrectSound : noop,
  ]
}
