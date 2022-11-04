import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CountdownContainer, Separetor } from './styles'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    ActiveCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = ActiveCycle ? ActiveCycle.minutesAmount * 60 : 0 // converte o numero de minutos em segundos

  // FAZENDO O COUNTDOWN FUNCIONAR
  useEffect(() => {
    let interval: number

    if (ActiveCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          ActiveCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    // deletando intervalos anteriores
    return () => {
      clearInterval(interval)
    }
  }, [
    ActiveCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  // CONVERTENDO OS MINUTOS EM SEGUNDOS
  const currentSeconds = ActiveCycle ? totalSeconds - amountSecondsPassed : 0 // conta de quantos segundos passaram
  const minutesAmount = Math.floor(currentSeconds / 60) // calcular total de segundos existe (metodo floor arredonda o resultado)
  const secondsAmount = currentSeconds % 60 // calcula quantos segundos tem do resto da divisão

  const minutes = String(minutesAmount).padStart(2, '0') // Variavel converte o numero de minutos para string (padStart preenche uma string ate um tamanho especifico)
  const seconds = String(secondsAmount).padStart(2, '0')

  // MOSTRANDO O RELOGIO NO TITULO DA PAGINA
  useEffect(() => {
    if (ActiveCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, ActiveCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separetor>:</Separetor>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
