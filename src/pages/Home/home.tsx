import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import * as zod from 'zod'
import { Button, StopButton, HomeContainer } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

const NewCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(5, 'Minimo 5min').max(60, 'max 60min'),
})

type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, ActiveCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      // Define os valores iniciais padrao
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task') // observa o campo de task
  const isSubmitDisabled = !task // verifica se o campo task esta desabilitado

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {ActiveCycle ? (
          <StopButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Parar
          </StopButton>
        ) : (
          <Button disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </Button>
        )}
      </form>
    </HomeContainer>
  )
}
