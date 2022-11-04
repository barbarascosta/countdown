import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { ActiveCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Nome do projeto"
        disabled={!!ActiveCycle}
        {...register('task')} // funcao que retorna metodos utilizados para trabalhar com input no JS
      />

      <label htmlFor="minutesAmont"> durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmont"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!ActiveCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
