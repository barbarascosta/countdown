import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  MarkCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/Reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

// CRIAÇAO DO CONTEXT API
interface CyclesContextType {
  cycles: Cycle[]
  ActiveCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) // armazena q quantidade de segundos desde que o ciclo foi ativo

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('timer: cycles-state', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState

  const ActiveCycle = cycles.find(
    (cycle: { id: any }) => cycle.id === activeCycleId,
  ) // cria um novo ciclo

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(MarkCurrentCycleAsFinishedAction())
  }

  // CRIA NOVO CICLO
  function createNewCycle(data: CreateCycleData) {
    const NewCycle: Cycle = {
      id: String(new Date().getTime()), // pega a data atual e retorna o horario, e isso sera o id
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(NewCycle))
    setAmountSecondsPassed(0)
  }

  // INTERROMPER CICLO
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        ActiveCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
